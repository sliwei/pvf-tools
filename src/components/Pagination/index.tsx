import React, { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import styled from 'styled-components'

const PaginationView = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .total {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
    font-weight: 400;
  }
`

const PaginationViewItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;

  > div {
    min-width: 32px;
    height: 32px;
    margin: 0 4px;
    background: #ffffff;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    text-align: center;
  }

  > div:last-child {
    margin-right: 0;
  }

  .perch {
    border: 0;
    background: no-repeat;
    padding: 0;
    margin: 0;
    min-width: 24px;
  }

  .txt {
    background-color: transparent;
    border: 0;
    padding: 0;
  }

  .inp {
    height: 100%;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 4px;
    width: 32px;
    text-align: center;
    padding: 0;
  }

  .icons {
    display: flex;
    align-items: center;
  }

  .hover {
    cursor: pointer;

    &:hover {
      border-color: #ff3300;
      color: #ff3300;
    }
  }

  .active {
    cursor: initial;
    border-color: #ff3300;
    color: #ff3300;
  }
`

interface Props {
  total: number
  size: number
  index: number
  onChange: (index: number) => void
}

export default ({ total, size = 10, index, onChange }: Props) => {
  const [inp, setInp] = useState(index)
  const [page, setPage] = useState(0)
  const [paths, setPaths] = useState<string[]>([])
  const [fixPath, setFixPath] = useState<string[]>([])

  useEffect(() => {
    if (paths.length > 6) {
      if (index < 4) {
        setFixPath(['1', '2', '3', '4', '...', `${paths.length}`])
      } else if (index > paths.length - 4) {
        setFixPath([
          '1',
          '...',
          `${paths.length - 3}`,
          `${paths.length - 2}`,
          `${paths.length - 1}`,
          `${paths.length}`
        ])
      } else {
        setFixPath([
          '1',
          '...',
          `${index - 1}`,
          `${index}`,
          `${index + 1}`,
          '...',
          `${paths.length}`
        ])
      }
    } else {
      setFixPath(paths.map((_item, i) => `${i + 1}`))
    }
  }, [paths, index])

  useEffect(() => {
    const _page = Math.ceil(total / size)
    const _paths = []
    for (let index = 0; index < _page; index++) {
      _paths.push('')
    }
    setPage(_page)
    setPaths(_paths)
  }, [total, size])

  useEffect(() => {
    setInp(index)
  }, [index])

  const jump = (i: number) => {
    if (i !== index) {
      onChange(i)
    }
  }

  const change = (e: { target: { value: any } }) => {
    const val = e.target.value
    let fixVal = parseInt(val)
    if (isNaN(fixVal)) {
      fixVal = inp
    }
    if (fixVal > page) {
      fixVal = page
    }
    if (fixVal < 1) {
      fixVal = 1
    }
    setInp(Number(fixVal))
    return Number(fixVal)
  }

  const blur = (e: { target: { value: any } }) => {
    jump(change(e))
  }

  const inpJump = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      jump(inp)
    }
  }

  return (
    <PaginationView>
      <div className="total">共&ensp;{total}&ensp;条，共&ensp;{page}&ensp;页</div>
      <PaginationViewItem>
        <div className="txt">前往第</div>
        <div className="txt">
          <input
            value={inp}
            onChange={change}
            onBlur={blur}
            className="inp"
            type="text"
            onKeyDown={inpJump}
          />
        </div>
        <div className="txt">页</div>
        <div
          className={`icons ${index !== 1 ? 'hover' : 'cursor-no-drop'}`}
          onClick={() => jump(Math.max(index - 1, 1))}
        >
          <BsChevronLeft />
        </div>
        {fixPath.map((path, i) =>
          path === '...' ? (
            <div key={i} className="perch">
              ...
            </div>
          ) : (
            <div
              className={`${Number(path) === index ? 'active' : ''} hover`}
              key={i}
              onClick={() => jump(Number(path))}
            >
              {path}
            </div>
          )
        )}
        <div
          className={`icons ${
            index !== Number(fixPath[fixPath.length - 1]) ? 'hover' : 'cursor-no-drop'
          }`}
          onClick={() => jump(Math.min(index + 1, page))}
        >
          <BsChevronRight />
        </div>
      </PaginationViewItem>
    </PaginationView>
  )
}
