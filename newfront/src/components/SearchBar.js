import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const SearchBar = () => {
  return (
        <div class="input-group rounded">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
        </span>
        </div>
  );
};

export default SearchBar;