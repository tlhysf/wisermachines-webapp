import colors from "./colors";

// const pageHeight = 630;
// const pageWidth = 1960;
const appBarHeight = 50;
const drawerCompactWidth = appBarHeight;
const drawerWidth = drawerCompactWidth * 4;
const drawerBreakpoint = "md";

export const layoutStyle = (theme) => ({
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  appBar: {
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerCompactWidth}px)`,
      marginLeft: drawerCompactWidth,
    },
    width: "100%",
    marginLeft: 0,
    backgroundColor: colors.BLUEGREY[100],
    color: colors.BLUEGREY[500],
    boxShadow: "0px 0px 0px 0px",
  },

  menuButtonDesktop: {
    [theme.breakpoints.down(drawerBreakpoint)]: {
      display: "none",
    },
    height: 30,
    width: 30,
    marginLeft: 10,
    marginTop: 15,
  },

  menuButtonMobile: {
    display: "none",
    [theme.breakpoints.down(drawerBreakpoint)]: {
      display: "flex",
    },
  },

  logo: {
    maxWidth: "80px",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxShadow: "0px 0px 0px 0px",
  },

  drawerClose: {
    overflowX: "hidden",
    width: drawerCompactWidth,

    [theme.breakpoints.down(drawerBreakpoint)]: {
      display: "none",
    },
  },

  listItem: {
    marginBottom: theme.spacing(2),
  },

  listItemIcon: {
    width: 20,
    color: colors.TEAL[700],
  },

  listItemText: {
    paddingLeft: 20,
    paddingTop: 2,
    color: colors.TEAL[700],
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up(drawerBreakpoint)]: {
      display: "flex",
    },
  },

  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up(drawerBreakpoint)]: {
      display: "none",
    },
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  menuItemIcon: {
    paddingRight: 10,
    color: colors.TEAL[600],
  },
});

export const common = (theme) => ({
  popper: {
    position: "relative",
    zIndex: 999,
  },
  button: {
    backgroundColor: "white",
    color: colors.BLUEGREY[500],
  },
  iconInsideButton: {
    height: 20,
    width: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  iconButton: {
    height: 15,
    width: 15,
  },
  menuItemIcon: {
    paddingRight: 10,
    height: 15,
  },
  cardHover: {
    "&:hover": {
      boxShadow: "0px 0.5px 1px 2px" + colors.INDIGO[400],
    },
  },
});

export const formStyle = (theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  submit: {
    marginTop: theme.spacing(4),
  },
  submitLoading: {
    marginTop: theme.spacing(4),
    height: 36,
    padding: 6,
  },
  divider: {
    marginTop: theme.spacing(5),
    backgroundColor: colors.BLUEGREY[500],
    height: 1,
    border: "none",
  },
  success: {
    backgroundColor: colors.LIGHTGREEN[400],
    color: "white",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
});

export const formSlider = {
  title: {
    fontSize: 13,
  },
  error: {
    fontSize: 12,
  },
  container: {
    margin: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
};

export const smallCard = {
  iconPaper: {
    padding: "5px 5px 5px 5px",
    display: "flex",
    justifyContent: "center",
    align: "center",
    backgroundColor: "transparent",
  },

  textPaper: {
    padding: "5px 5px 5px 5px",
    display: "flex",
    justifyContent: "center",
    align: "center",
    backgroundColor: "transparent",
    minHeight: "45px",
  },
};
