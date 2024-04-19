import React from 'react';

const styleDefault = {
    width:'100%', 
    height:'50px', 
    backgroundColor: 'white',
    padding:'5px'
}

const ProgressBar = ({value, maxValue, color='orange', style=styleDefault}) => {
    return (
      <div className='progressBar' style={style}>
           <div className="progressValue" style={{width:`${(value / maxValue) * 100}%`, backgroundColor:color, height:'100%'}} >hp:{value}/{maxValue}</div>
      </div>
    )
}

export default ProgressBar;