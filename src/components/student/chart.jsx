import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: '01 Jan',
    uv: 9,
    pv: 4,
  },
  {
    name: '02 Jan',
    uv: 12,
    pv: 8,
  },
  {
    name: '03 Jan',
    uv: 13,
    pv: 10,
  },
  {
    name: '04 Jan',
    uv: 16,
    pv: 14,
  },
  {
    name: '05 Jan',
    uv: 14,
    pv: 12,
  },
  {
    name: '06 Jan',
    uv: 12,
    pv: 14,
  },
  {
    name: '07 Jan',
    uv: 9,
    pv: 16,
  },
  {
    name: '08 Jan',
    uv: 8,
    pv: 12,
  },
  {
    name: '09 Jan',
    uv: 12,
    pv: 10,
  },
  {
    name: '10 Jan',
    uv: 12,
    pv: 10,
  },
  {
    name: '11 Jan',
    uv: 16,
    pv: 13,
  }
];


const Chart = ({chart}) => {

  return (
    <ResponsiveContainer width="99%" aspect={2}>

      <LineChart
        width={1000}
        height={321}
        data={chart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1000 7" horizontal={false} />
        <XAxis fontSize={16} tickMargin={16}
          tickLine={false} axisLine={false} dataKey="name" />
        <YAxis domain={[0, 'auto']} ticks={[0, 'auto']} fontSize={16} tickMargin={21} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend type="" verticalAlign="top" align="right" />
        <Line type="monotone" dataKey="pv" name="previous" strokeWidth={3} dot={false} stroke="#00E4FF" />
        <Line type="monotone" dataKey="uv" name="current" stroke="#00778F" dot={false} strokeWidth={3} />
        <ReferenceLine y={80} label={10} stroke="red" strokeWidth={0} />
        {/* <ReferenceLine y={10} x={10} label={<ReferenceLabel value="14222xx" />} strokeWidth={0} /> */}

      </LineChart>
    </ResponsiveContainer>
  );

}

export default Chart;