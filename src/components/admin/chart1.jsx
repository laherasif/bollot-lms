import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from 'react-icons/fa'

const Chart = ({ color, strokeColor, label, value, chart }) => {
  const CustomizedDot = (props) => {
    const { cx, cy, value } = props;

    if (value == 18 || value == 12) {
      return (
        <svg x={cx - 10} y={cy - 10} >

          <FaCircle size={12} fill={color} strokeWidth={60} stroke={strokeColor} nameKey="name">

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
              stroke={color}
              // dot={<CustomizedDot />}
              strokeWidth={3}
            />
            <XAxis fontSize={16} tickMargin={16}
              tickLine={false} axisLine={false} dataKey="name" style={{display:'none'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
