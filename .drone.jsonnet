local NAME="pvf-tools";
local SOURCE="/data/docker/awei/" + NAME+"/source/";

[
  {
    "kind": "pipeline",
    "type": "docker",
    "name": "deploy",
    "steps": [
      {
        "name": "restore-cache",
        "image": "drillster/drone-volume-cache",
        "settings": {
          "restore": true,
          "mount": [
            "./node_modules"
          ]
        },
        "volumes": [
          {
            "name": "cache",
            "path": "/cache"
          }
        ]
      },
      {
        "name": "build & copy",
        "image": "node:14",
        "volumes": [
          {
            "name": "source-conf",
            "path": SOURCE
          }
        ],
        "commands": [
          "yarn",
          "yarn --max-old-space-size=1024 build:prod",
          "mkdir -p "+SOURCE, # 创建源码目录
          "rm -rf "+SOURCE+"*", # 删除以前的源码
          "cp -rf dist/* "+SOURCE
        ]
      },
      {
        "name": "rebuild-cache",
        "image": "drillster/drone-volume-cache",
        "settings": {
          "rebuild": true,
          "mount": [
            "./node_modules"
          ]
        },
        "volumes": [
          {
            "name": "cache",
            "path": "/cache"
          }
        ]
      },
      {
        "name": "up",
        "image": "appleboy/drone-ssh",
        "settings": {
          "host": "2024.bstu.cn",
          "username": "root",
          "key": {
            "from_secret": "drone_id_rsa"
          },
          "port": 22,
          "command_timeout": "10m",
          "script_stop": false,
          "script": [
            "cd "+SOURCE,
            // "docker build -t "+NAME+" .",
            "cd ..",
            "docker compose up -d"
          ]
        }
      },
      {
        "name": "notify",
        "pull": "if-not-exists",
        "image": "guoxudongdocker/drone-dingtalk:latest",
        "settings": {
          "token": {
            "from_secret": "dingtalk_token"
          },
          "type": "markdown",
          "message_color": true,
          "message_pic": true,
          "sha_link": true
        },
        "when": {
          "status": [
            "failure",
            "success"
          ]
        }
      }
    ],
    "volumes": [
      {
        "name": "source-conf",
        "host": {
          "path": SOURCE
        }
      },
      {
        "name": "cache",
        "host": {
          "path": "/tmp/cache"
        }
      }
    ]
  }
]
