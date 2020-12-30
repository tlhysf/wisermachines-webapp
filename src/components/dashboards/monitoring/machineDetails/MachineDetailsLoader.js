import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
// import colors from "../../../../utils/colors";

const skeletonStyle = {
  borderRadius: 5,
  backgroundColor: "white",
};

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
      height: 50,
      justifyContent: "space-between",
    }}
  >
    {card}
    {card}
    {card}
    {card}
  </div>
);

const row2 = (
  <div
    style={{
      display: "flex",
      marginBottom: 10,
      height: 150,
      justifyContent: "space-between",
    }}
  >
    {card}
    {card}
    {card}
    {card}
  </div>
);

const chart = (
  <Skeleton
    animation="pulse"
    variant="rect"
    height="100%"
    width="100%"
    style={skeletonStyle}
  ></Skeleton>
);

const row3 = (
  <div
    style={{
      display: "flex",
      marginBottom: 15,
      height: 400,
      justifyContent: "space-between",
    }}
  >
    {chart}
  </div>
);

const MachineDetailsLoader = (
  <Grid
    item
    xs={12}
    style={{
      height: 600,
    }}
  >
    {row1}
    {row2}
    {row3}
  </Grid>
);

export default MachineDetailsLoader;
