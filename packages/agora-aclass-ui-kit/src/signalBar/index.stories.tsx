import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'

enum SignalRoleTypeEnum {
  None = 0,
  Level1 = 1,
  Level2 = 2,
  Level3 = 3,
}
interface ISignalBar {
  foregroundColor?: string,
  width?: string,
  level: SignalRoleTypeEnum
}

export default {
  title: '信号条',
  argTypes: {
    foregroundColor: { control: 'color' },
    level: {
      control: SignalRoleTypeEnum
    }
  }
}

const rgbaToHexColor = (color) => {
  const reg = /^(rgb|RGB|RGBA|rgba)/;
  if (reg.test(color)) {
    let strHex = "#";
    const colorArr = color.replace(/(?:\(|\)|rgba|RGBA|RGB|rgb)*/g, "").split(",");
    for (let i = 0; i < colorArr.length - 1; i++) {
      let hex = Number(colorArr[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return color;
  }
}

export const SignalBar = (props: ISignalBar) => {
  const { foregroundColor = '#598bdd', width = '3em' } = props || {}
  const temp = ` ${rgbaToHexColor(foregroundColor)}40 `
  const empty = ` ${rgbaToHexColor(foregroundColor)}00 `
  const { level } = props
  const useStyles = makeStyles((theme: Theme) => ({
    indicator: {
      display: 'block',
      position: 'relative',
      width,
      margin: '1px auto',
      clear: 'both',
      '&:before': {
        content: "''",
        display: 'block',
        paddingBottom: '100%',
      },
      '&:after': {
        content: "''",
        position: 'absolute',
        display: 'block',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '100% 33.33%, 100% 66.66%, 100% 100%',
        top: '10%',
        left: 0,
        width: '100%',
        height: '80%',
      }
    },
    'None': {
      '&:after': {
        backgroundImage: `linear-gradient(to right, ${temp}, ${temp} 20%,${empty} 20%,${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 40%, ${temp} 40%,${temp} 60%,${empty} 60%,${empty} 100%), linear-gradient(to right,${empty} 0%, ${empty} 80%,${temp}80%,${temp}100%)`,
      }
    },
    'Level1': {
      '&:after': {
        backgroundImage: `linear-gradient(to right,${foregroundColor}, ${foregroundColor} 20%,${empty} 20%,${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 40%, ${temp} 40%,${temp} 60%,${empty} 60%,${empty} 100%), linear-gradient(to right,${empty} 0%, ${empty} 80%,${temp} 80%,${temp} 100%)`,
      }
    },
    'Level2': {
      '&:after': {
        backgroundImage: `linear-gradient(to right,${foregroundColor} , ${foregroundColor} 20%,${empty} 20%, ${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 40%,${foregroundColor} 40%,${foregroundColor} 60%,${empty} 60%,${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 80%,${temp} 80%, ${temp} 100%)`,
      }
    },
    "Level3": {
      '&:after': {
        backgroundSize: '100% 33.33%, 100% 66.66%, 100% 100%',
        backgroundImage: `linear-gradient(to right,${foregroundColor},${foregroundColor} 20%,${empty} 20%,${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 40%,${foregroundColor} 40%,${foregroundColor} 60%,${empty} 60%,${empty} 100%),linear-gradient(to right,${empty} 0%,${empty} 80%,${foregroundColor} 80%,${foregroundColor} 100%)`
      }
    }
  }))
  const classes = useStyles()
  const currentLevelClass = SignalRoleTypeEnum[level]
  return (
    <div className={`${classes.indicator} ${classes[currentLevelClass] ?? classes.None}`} ></div>
  )
}

SignalBar.args = {
  foregroundColor: '#598bdd',
  width: '2em',
  level: SignalRoleTypeEnum.Level3
}
