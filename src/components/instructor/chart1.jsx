import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from 'react-icons/fa'


const Chart = ({ color, strokeColor, label, value, chart }) => {
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    if (value == 18 || value == 12) {
      return (
        <svg x={cx - 10} y={cy - 10} >

          <FaCircle size={12} fill={color} strokeWidth={60} stroke={strokeColor} >

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
      <div style={{ position: "relative", top: 20, right: 80 }}>
        <ResponsiveContainer width={180} height={100}>
          <LineChart
            height={321}
            width={500}
            data={chart}
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
