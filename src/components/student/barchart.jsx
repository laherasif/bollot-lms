import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ReferenceLine, BarChart, Bar, ResponsiveContainer } from 'recharts';



const Chart = ({chart}) => {

  return (
    <ResponsiveContainer width="99%" aspect={1.2}  >


      <BarChart
        width={1080}
        height={321}
        data={chart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip />
        <Bar radius={[5, 5, 5, 5]} className='ksldjafds-dsfads' dataKey="uv" barSize={18} fill="#8884d8" >
          {
            chart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 != 0 ? "#9FF5FF" : "#00778F"} />
            ))
          }

        </Bar>
        {/* <XAxis fontSize={16} tickMargin={16}
          tickLine={false} axisLine={false} dataKey="name" /> */}
      </BarChart>
    </ResponsiveContainer>
  );

}

export default Chart;