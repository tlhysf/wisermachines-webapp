import React from "react";

// import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import DashboardSummaryCard from "../../../common/DashboardSummaryCard";
import Card from "../../../common/Card";
import Grow from "@material-ui/core/Grow";

import {
  parseZoneDetailsData,
  // parseZoneSummaryData,
} from "../../../../utils/parse";

import {
  status,
  info1,
  info2,
  gaugeItem1,
  gaugeItem2,
} from "../../../../data/machineSummaryCard";
import { summaryHeader } from "../../../../data/summaryHeader";

import keys from "../../../../utils/keys";

const animationDuration = 200;

export default function MachineCards(props) {
  // const zoneSummary = useSelector((state) => state.machines.zoneSummary);

  return (
    <Grid container spacing={2}>
      {
        keys.showMockData ? (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {summaryHeader().map((item, index) => {
                return (
                  <Grow
                    key={index}
                    in={true}
                    {...{
                      timeout: animationDuration + index * animationDuration,
                    }}
                  >
                    <Grid item key={index} lg={2} md={4} sm={6} xs={12}>
                      <Card data={item} />
                    </Grid>
                  </Grow>
                );
              })}
            </Grid>
          </Grid>
        ) : null
        // <Grid item xs={12}>
        //   <Grid container spacing={2}>
        //     {parseZoneSummaryData(zoneSummary).map((item, index) => {
        //       return (
        //         <Grow
        //           key={index}
        //           in={true}
        //           {...{
        //             timeout: animationDuration + index * animationDuration,
        //           }}
        //         >
        //           <Grid item key={index} lg={2} md={4} sm={6} xs={12}>
        //             <Card data={item} />
        //           </Grid>
        //         </Grow>
        //       );
        //     })}
        //   </Grid>
        // </Grid>
      }
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {props.allMachinesInAZone.map((item, index) => (
            <Grow
              key={index}
              in={true}
              {...{ timeout: animationDuration + index * animationDuration }}
            >
              <Grid key={index} item xl={3} md={4} xs={12}>
                {keys.showMockData ? (
                  <DashboardSummaryCard
                    compact={props.compact}
                    data={{
                      name: item.name,
                      ID: item._id,
                      mapping: true,
                      status: status(),
                      info1: info1(),
                      info2: info2(),
                      gaugeItem1: gaugeItem1(),
                      gaugeItem2: gaugeItem2(),
                    }}
                  />
                ) : (
                  <DashboardSummaryCard
                    compact={props.compact}
                    data={parseZoneDetailsData(item)}
                  />
                )}
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
