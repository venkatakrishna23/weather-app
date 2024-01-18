import React from 'react'

export default function TableComponent(props) {
    console.log(props.data)
    const getFormattedDate=(date)=>{
        const today = new Date(date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        return dd + '/' + mm + '/' + yyyy;
        
    }
    if(props.data){
  return (
    <div className='day-wise-weather'><table>
    <tr>
      <th  className='dateHeader' colSpan="2">Date:{getFormattedDate(props.data?.dt_txt)}</th>
      
    </tr>
    <tr>
      
      <th  className='grayBackground' colSpan="2">Temperature</th>
    </tr>
    <tr>
      <td className='grayBackground'>Min</td>
      <td className='grayBackground'>Max</td>
     
    </tr>
    <tr>
      <td className='grayBackground'> {props.data?.main?.temp_min||'-'}</td>
      <td className='grayBackground'>{props.data?.main?.temp_max||'-'}</td>

    </tr>
    <tr>
      <td>Pressure</td>
      <td>{props.data?.main?.pressure||'-'}</td>

    </tr>
    <tr>
      <td>Humidity</td>
      <td>{props.data?.main?.humidity||'-'}</td>

    </tr>
  </table>
  </div>
  )
    }else{
        return ''
    }
}
