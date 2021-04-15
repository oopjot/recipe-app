import React, { useState, useEffect } from "react";
import "./SortInput.scss";
import { getRecipes } from "../../state/recipes/operations";
import {
  byNameRecipes,
  byNumberOfCommentsRecipes,
  byRateRecipes,
} from "../../state/recipes/selectors";
import { connect } from "react-redux";

const SortInput = ({
  recipes,
  recipesByComments,
  recipesByName,
  recipesByRate,
  fetchRecipes,
  sorted,
  setSorted,
}) => {

  const [sorter, setSorter] = useState({
    byName: false,
    byRate: false,
    byComments: false,
    byRecent: true,
  });

  useEffect(() => {
    fetchRecipes();
    setSorted(
      sorter.byName
        ? [...recipesByName]
        : sorter.byRate
        ? [...recipesByRate]
        : sorter.byComments
        ? [...recipesByComments]
        : [...[...recipes].reverse()]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorter, fetchRecipes]);

  return (
    <select
      name="sortby"
      id="sortby"
      onChange={(e) => {
        const val = e.target.value;
        return val === "name"
          ? setSorter({
              ...sorter,
              byName: true,
              byRate: false,
              byComments: false,
              byRecent: false,
            })
          : val === "rate"
          ? setSorter({
              ...sorter,
              byName: false,
              byRate: true,
              byComments: false,
              byRecent: false,
            })
          : val === "comments"
          ? setSorter({
              ...sorter,
              byName: false,
              byRate: false,
              byComments: true,
              byRecent: false,
            })
          : val === "recent"
          ? setSorter({
              ...sorter,
              byName: false,
              byRate: false,
              byComments: false,
              byRecent: true,
            })
          : val;
      }}
    >
      <option value="name">Sort by name</option>
      <option value="rate">Sort by rate</option>
      <option value="comments">Sort by comments</option>
      <option value="recent">Sort by recent</option>
    </select>
  );
};

const mapStateToProps = (state) => ({
  // users: state.users,
  recipes: state.recipes,
  recipesByRate: byRateRecipes(state),
  recipesByName: byNameRecipes(state),
  recipesByComments: byNumberOfCommentsRecipes(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(getRecipes()),
  // fetchUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortInput);
