import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
// import colors from "../../../../utils/colors";

const skeletonStyle = {
  borderRadius: 5,
  backgroundColor: "white",
};

const headerCard = (
  <Skeleton
    animation="pulse"
    variant="rect"
    height="100%"
    width="16.1%"
    style={skeletonStyle}
  ></Skeleton>
);

const card = (
  <Skeleton
    animation="pulse"
    variant="rect"
    height="100%"
    width="24.5%"
    style={skeletonStyle}
  ></Skeleton>
);

const row1 = (
  <div
    style={{
      display: "flex",
      marginBottom: 10,
      height: 64,
      justifyContent: "space-between",
    }}
  >
    {headerCard}
    {headerCard}
    {headerCard}
    {headerCard}
    {headerCard}
    {headerCard}
  </div>
);

const row2 = (
  <div
    style={{
      display: "flex",
      marginBottom: 10,
      height: 224,
      justifyContent: "space-between",
    }}
  >
    {card}
    {card}
    {card}
    {card}
  </div>
);

const ZonesLoader = (
  <Grid
    item
    xs={12}
    style={{
      height: 600,
    }}
  >
    {row1}
    {row2}
    {row2}
  </Grid>
);

export default ZonesLoader;
