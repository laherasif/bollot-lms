import React from "react";
import Link from "next/link";
import { MdOutlineReviews } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import Icons from "./icons";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";
export default () => {
  const openPan = () => {
    const element = document.querySelector("#sidebar-cst");
    const element1 = document.querySelector(".dash-board-1");
    if (element?.classList.contains("sidebaropen")) {
      element?.classList.remove("sidebaropen");
    } else {
      element?.classList.add("sidebaropen");
    }
    if (element1?.classList.contains("sidebaropen-p")) {
      element1?.classList.remove("sidebaropen-p");
    } else {
      element1?.classList.add("sidebaropen-p");
    }
  };

  const SideBarChild = () => {


    const { Admin } = useSelector((state: RootStateOrAny) => state.admin)





    const router = useRouter()
    let sidebar = [
      {
        id: 1,
        link: "/en/admin/courses",
        text: "Courses",
        icon: "i2"
      },
      {
        id: 2,
        link: "/en/admin/employe",
        text: "Users",
        icon: "i3"

      },
      {
        id: 3,
        link: "/en/admin/website",
        text: "Website",
        icon: "i4"

      },
      {
        id: 4,
        link: "/en/admin/transaction",
        text: "Transaction",
        icon: "i3"
      },
      {
        id: 5,
        link: "/en/admin/penddingPurchase",
        text: "Pendding Purchase",
        icon: "i2"

      },
      {
        id: 6,
        link: "/en/admin/membership",
        text: "Membership",
        icon: "i4"

      },
      {
        id: 7,
        link: "/en/admin/subAdmin",
        text: "Sub Admin",
        icon: "i4"

      },
    ]

    return (
      <div className="inst-side" style={{ height: '100%', width: '150px' }}>
        <div className="admin-1" id="sidebar-cst" style={{ height: '100%' }}>
          <Link href="/en/admin/dashboard">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/dashboard" ? " dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i1" />
              <h3>Dashboard</h3>
            </div>
          </Link>
          {
            sidebar.map((sid) => {
              if (Admin?.roles?.some((s) => s.id === sid.id)) {
                return (
                  <Link href={sid.link}>
                    <div className={`dash-ch-2 sdisad-dsd ${router.asPath === sid?.link ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
                      <Icons name={sid.icon} />
                      <h3 className="text-center"> {sid.text}</h3>
                    </div>
                  </Link>
                )
              }
            }
            )
          }


        </div>
      </div>
    );
  };
  return (
    <div className="jkdasfis-adaerin">
      <div className="kjadsf03we-jda3">
        <SideBarChild />
      </div>
      <div className="kajsf0-3ja3rra">
        <Navbar className="hdhafs-dawej" expand={false}>
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="kjsda03ejisaeas"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body >
                <SideBarChild />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
