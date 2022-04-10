import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Pie,
  PieChart,
  ReferenceLine,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export function ReferenceLabel(props) {
  const { fill, value, textAnchor, fontSize, viewBox, dy, dx } = props;
  const x = viewBox.x + 20;
  const y = viewBox.y - 6;
  return (
    <>
      <svg
        x={x + 450}
        y={y - 45}
        dy={dy}
        dx={dx}
        width="94"
        height="94"
        viewBox="0 0 94 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d)">
          <circle cx="47" cy="47" r="17" fill="white" />
        </g>

        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="94"
            height="94"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="15" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <text
        x={x + 487}
        y={y + 6}
        dy={dy}
        dx={dx}
        fill={fill}
        fontSize={fontSize || 16}
        textAnchor={textAnchor}
      >
        {value}
      </text>
    </>
  );
}
const data01 = [
  {
    "name": "Group A",
    "value": 600
  },
  {
    "name": "Group B",
    "value": 300
  } 
];  

const Chart = () => {
  return (
    <ResponsiveContainer  width={180} height={180}>
      <PieChart
        width={180}
        height={180}
        data={data01}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip />
        {/* <ReferenceLine y={80} label={} stroke="red" strokeWidth={0}  /> */}
        <Pie
          className="ksldjafds-dsfads"
          data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60} fill="#8884d8" 
        >
          {data01.map((entry, index) => (
            <Cell fill={index % 2 != 0 ? "#9FF5FF" : "#00778F"} />
          ))}
          {/* {
                       data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index%2!=0?"#FAEADB":"#D0565C"} />
                        ))
                    } */}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
