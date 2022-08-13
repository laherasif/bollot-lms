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

const data01 = [
  {
    name: "Group A",
    value: 600
  },
  {
    name: "Group c",
    value: 600
  },
  {
    "name": "Group B",
    value: "300"
  } 
];  

const Chart = ({chart}) => {
  return (
    <ResponsiveContainer  width={180} height={180}>
      <PieChart
        width={180}
        height={180}
        data={chart}
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
          data={chart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60} fill="#8884d8" 
        >
          {chart?.map((entry, index) => (
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
