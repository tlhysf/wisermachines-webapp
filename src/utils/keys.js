const keys = {
  // Production
  server: "http://115.186.183.129:37000",

  // Staging
  // server: "http://115.186.183.129:27000",

  showMockData: true,
  showDashboardSummaryCards: true,
  showDashboardSummaryHeaders: true,

  minimalMachineSummaryCards: true,

  featureTemporarilyUnavailable: false,

  users: [
    {
      name: "default",
      password: "default",
      workshopID: "default",
      navigationAliases: ["default", "default"],
    },
    {
      name: "shifa",
      password: "1234",
      workshopID: "5fecdd5a7221a50e7842198b",
      navigationAliases: ["workshops", "zones"],
    },
    {
      name: "gsk",
      password: "1234",
      workshopID: "600fabc8549c501670d98806",
      navigationAliases: ["workshops", "zones"],
    },
    {
      name: "kolson",
      password: "1234",
      workshopID: "",
      navigationAliases: ["workshops", "zones"],
    },
    {
      name: "demo",
      password: "demo",
      workshopID: "demo",
      navigationAliases: ["workshops", "zones"],
    },
    {
      name: "ihsan-safety",
      password: "1234",
      workshopID: "6011407db9c4963230840521",
      navigationAliases: ["workshops", "zones"],
    },
  ],
};

export default keys;
