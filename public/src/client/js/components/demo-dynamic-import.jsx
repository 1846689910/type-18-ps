import React, { lazy, Suspense } from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setShowFakeComp } from "../settings/actions";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css"; // eslint-disable-line
import custom from "../../styles/main.styl"; // eslint-disable-line no-unused-vars
import Promise from "bluebird";
const NamedLazyComp = lazy(() => import("./demo-fake").then(module => ({ default: module.Fake })));
const NamedLazyComp2 = loadable(() =>
  import("./demo-fake").then(module => ({ default: module.Fake }))
);
const DefaultLazyComp = lazy(() => import("./demo-fake"));
const DefaultLazyComp2 = loadable(() => import("./demo-fake"));

let Fake;
const loadFakeComp = (dispatch, doRefresh = false) => {
  if (!Fake || doRefresh) {
    const ready = doRefresh
      ? Promise.try(() => dispatch(setShowFakeComp(false))).delay(1000)
      : Promise.try(() => {});
    ready
      .then(() => import("./demo-fake"))
      .then(({ Fake: _Fake }) => {
        Fake = _Fake;
        dispatch(setShowFakeComp(true));
      });
  }
};

const DynamicImportDemo = props => {
  const { showFakeComp, dispatch } = props;
  loadFakeComp(dispatch);
  return (
    <div styleName={"custom.dynamic-import-box"}>
      <div>
        <h6>Webpack Dynamic Import</h6>
        {showFakeComp.value && Fake ? <Fake {...props} /> : <div>Fake Comp is loading ...</div>}
        <button
          styleName={"bootstrap.btn bootstrap.btn-primary"}
          onClick={() => loadFakeComp(dispatch, true)}
        >
          Refresh Fake Comp
        </button>
      </div>
      <br />
      <div>
        <h6>React Lazy Suspense Dynamic Import</h6>
        <Suspense fallback={<div>MyLazyComp is Loading</div>}>
          <NamedLazyComp />
          <DefaultLazyComp />
        </Suspense>
      </div>
      <br />
      <div>
        <h6>
          <a href="https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/">
            @loadable/component
          </a>&nbsp;
          Dynamic Import
        </h6>
        <NamedLazyComp2 />
        <DefaultLazyComp2 />
        <div />
      </div>
    </div>
  );
};
DynamicImportDemo.propTypes = {
  showFakeComp: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(DynamicImportDemo);
