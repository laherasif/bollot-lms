import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

export function ReferenceLabel(props) {
  const {
    fill, value, textAnchor,
    fontSize, viewBox, dy, dx,
  } = props;
  const x = viewBox.x + 20;
  const y = viewBox.y - 6;
  return (
    <>

      <svg x={x + 450} y={y - 45}
        dy={dy}
        dx={dx} width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">

          <circle cx="47" cy="47" r="17" fill="white" />
        </g>

        <defs>
          <filter id="filter0_d" x="0" y="0" width="94" height="94" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
      <text x={x + 487} y={y + 6}
        dy={dy}
        dx={dx}
        fill={fill}
        fontSize={fontSize || 16}
        textAnchor={textAnchor}>{value}</text>

    </>


  )
}
const data = [
  {
    name: '01 Jan',
    uv: 9,
    pv:4,
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
    uv:  9,
    pv: 16,
  },
  {
    name: '08 Jan',
    uv:  8,
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


const Chart = () => {

  return (
    <ResponsiveContainer   width="99%"  aspect={2}>


      <LineChart
      width={1000}
         height={321}
        data={data}
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
        <YAxis domain={[0, 24]} ticks={[0, 6, 12, 18, 24]} fontSize={16} tickMargin={21} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend type="" verticalAlign="top" align="right" />
        <Line type="monotone" dataKey="pv" name="Heading 1" strokeWidth={3} dot={false} stroke="#00E4FF" />
        <Line type="monotone" dataKey="uv" name="Heading 2" stroke="#00778F" dot={false} strokeWidth={3} />
        <ReferenceLine y={80} label={10} stroke="red" strokeWidth={0}  />
        {/* <ReferenceLine y={10} x={10} label={<ReferenceLabel value="14222xx" />} strokeWidth={0} /> */}

      </LineChart>
    </ResponsiveContainer>
  );

}

export default Chart;