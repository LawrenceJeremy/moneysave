import Link from "next/link";
import React from "react";

function NavLink() {
  const navItems = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Records", path: "/" },
    { id: 3, label: "Analysis", path: "/" },
    { id: 4, label: "Budgets", path: "/" },
    { id: 5, label: "Accounts", path: "/" },
    { id: 6, label: "Categories", path: "/" },
  ];

  return (
    <ul className="flex flex-col gap-4 md:flex-row md:gap-6">
      {navItems.map((item) => (
        <li key={item.id}>
          <Link
            href={item.path}
            className="block font-medium hover:text-primary"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
;}

export default NavLink;
