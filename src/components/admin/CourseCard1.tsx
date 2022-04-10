import Link from "next/link";
import React from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, RootStateOrAny } from "react-redux";
import Icons from "../../icons";
export default ({ role } : any ) => {
  const { Students, Instructor } = useSelector((state: RootStateOrAny) => state.admin)

  console.log("stude", Students, "ins", Instructor)

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Image</th>
            <th>Role</th>
            <th>Username</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {role === "student" ?
            Students && Students.map((st: any) => (
              <tr>
                <td>{st.id}</td>
                <td>{st.fullname}</td>
                <td>{st.email}</td>
                <td style={{ width: '20%' }}><img src={st.image} alt="student_img" width="15%" height="15%" /></td>
                <td>{st.role}</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <td>
                    <i className="fa fa-edit "></i>
                    <i className="fa fa-trash " style={{ paddingLeft: '10px' }} ></i>
                  </td>
                </td>

              </tr>
            ))
            :
            Instructor && Instructor.map((ins: any) => (
              <tr>
                <td>{ins.id}</td>
                <td>{ins.fullname}</td>
                <td>{ins.email}</td>
                <td style={{ width: '20%' }}><img src={ins.image} alt="insudent_img" width="15%" height="15%" /></td>
                <td>{ins.role}</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <td>
                    <i className="fa fa-edit "></i>
                    <i className="fa fa-trash " style={{ paddingLeft: '10px' }} ></i>
                  </td>
                </td>

              </tr>
            ))
          }


        </tbody>
      </Table>
    </Container>
  );
};
