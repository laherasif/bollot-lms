import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {FaCircle} from 'react-icons/fa'
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
const data = [
  {
    name: "01 Jan",
    uv: 9,
    pv: 4,
  },

  {
    name: "06 Jan",
    uv: 11,
    pv: 14,
  },
  {
    name: "07 Jan",
    uv: 19,
    pv: 16,
  },
  {
    name: "08 Jan",
    uv: 18,
    pv: 12,
  },
  {
    name: "09 Jan",
    uv: 24,
    pv: 10,
  },
  {
    name: "10 Jan",
    uv: 12,
    pv: 10,
  },
  {
    name: "11 Jan",
    uv: 16,
    pv: 13,
  },
];

const Chart = ({ color, strokeColor, label, value }) => {
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    if (value == 18 || value == 12) {
      return (
        <svg x={cx - 10} y={cy - 10} >
 
          <FaCircle  size={12} fill={color} strokeWidth={60} stroke={strokeColor} >

            </FaCircle>
        
        </svg>
      );
    }

    return <></>;
  };

  return (
    <div className="nkasdad-asdn">
      <div className="kdjasfd0sfs-dsads">
        <p>{label}</p>
        <h5 style={{ color }}>{value}</h5>
      </div>
      <div style={{ position: "relative", top: 20,right:80 }}>
        <ResponsiveContainer width={180} height={100}>
          <LineChart
            height={321}
            width={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Tooltip />
            <Line
              type="monotone"
              dataKey="uv"
              name="Heading 2"
              stroke={color}
              dot={<CustomizedDot />}
              strokeWidth={3}
            />
            {/* <ReferenceLine y={10} x={10} label={<ReferenceLabel value="14222xx" />} strokeWidth={0} /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
