local NAME="pvf-tools";
local RUN="/data/wwwroot/" + NAME;

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
            "name": "run-conf",
            "path": RUN
          }
        ],
        "commands": [
          "yarn",
          "yarn build:live",
          "mkdir -p "+RUN,
          "cp -rf dist/prod/index.html "+RUN+"/index.html"
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
        "name": "run-conf",
        "host": {
          "path": RUN
        }
      }
    ]
  }
]