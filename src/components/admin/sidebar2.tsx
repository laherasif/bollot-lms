import React from "react";
import Link from "next/link";
import { MdOutlineReviews } from "react-icons/md";
import { BsWallet2 } from "react-icons/bs";
import Icons from "./icons";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
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
    const router = useRouter()
    return (
      <div className="inst-side" style={{ height: '100%', width: '150px' }}>
        <div className="admin-1" id="sidebar-cst" style={{ height: '100%' }}>
          <Link href="/en/admin/dashboard">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/dashboard" ? " dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i1" />
              <h3>Dashboard</h3>
            </div>
          </Link>
          <Link href="/en/admin/courses">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/courses" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i2" />
              <h3> Courses</h3>
            </div>
          </Link>
          <Link href="/en/admin/employe">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/employe" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i2" />
              <h3> Users</h3>
            </div>
          </Link>
          <Link href="/en/admin/website">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/website" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i3" />
              <h3> Website</h3>
            </div>
          </Link>
          <Link href="/en/admin/transaction">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/transaction" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i3" />
              <h3> Transaction</h3>
            </div>
          </Link>
          <Link href="/en/admin/certificate">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/certificate" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i4" />
              <h3> Certificate</h3>
            </div>
          </Link>
          <Link href="/en/admin/membership">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/membership" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i4" />
              <h3>MemberShip</h3>
            </div>
          </Link>
          <Link href="/en/admin/profile">
            <div className={`dash-ch-2 sdisad-dsd ${router.asPath === "/en/admin/profile" ? "dash-ch-2 sdisad-dsdactive" : ""}`}>
              <Icons name="i5" />
              <h3>Profile</h3>
            </div>
          </Link>
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
