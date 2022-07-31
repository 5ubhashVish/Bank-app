import React from "react";
import { Link } from "react-router-dom";

const breadcrumb = (props) => {
  const checkIndex = (index) => {
    return index === props.crumbs.length - 1;
  };
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {props.crumbs.map((crumb, indx) => {
          const selected = checkIndex(indx);
          return (
            <li
              key={indx + "crumb"}
              className={
                selected ? "breadcrumb-item" : "breadcrumb-item active"
              }
            >
              {selected ? (
                crumb.value
              ) : (
                <Link
                  onClick={() => props.handleNavigation(crumb.value)}
                  to={crumb.href}
                >
                  {crumb.value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default breadcrumb;
