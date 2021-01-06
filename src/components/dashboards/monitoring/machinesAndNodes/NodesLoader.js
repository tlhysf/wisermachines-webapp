import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import { skeletonStyle } from "../../../../utils/styles";
// import colors from "../../../../utils/colors";

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
      height: 100,
      justifyContent: "space-between",
    }}
  >
    {card}
    {card}
    {card}
    {card}
  </div>
);

const NodesLoader = (
  <Grid
    item
    xs={12}
    style={{
      height: 600,
    }}
  >
    {row1}
    {row1}
    {row1}
  </Grid>
);

export default NodesLoader;
