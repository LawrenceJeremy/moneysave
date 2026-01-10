import Link from "next/link";
import React from "react";

function NavLink() {
  const navItems = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Records", path: "/page/record" },
    { id: 3, label: "Analysis", path: "/" },
    { id: 4, label: "Budgets", path: "/" },
    { id: 5, label: "Accounts", path: "/page/account" },
    { id: 6, label: "Categories", path: "/" },
  ];

  return (
    <ul className="flex space-x-6">
        {navItems.map((item) => (
            <li key={item.id}>
                <Link href={item.path}>{item.label}</Link>
            </li>
        ))}
    </ul>
  )
;}

export default NavLink;
