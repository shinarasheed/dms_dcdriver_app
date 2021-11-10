import { StyleSheet } from "react-native";

import appTheme from "../../constants/theme";

export default styles = StyleSheet.create({
  homeScreenContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30,
  },
  dateIcon: {
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 110,
    height: 40,
    backgroundColor: appTheme.COLORS.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: appTheme.COLORS.borderGRey1,
    paddingLeft: 18,
  },
  saleHistoryContainer: {
    marginTop: 40,
  },
  notifications: {
    backgroundColor: appTheme.COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },

  notificationText: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: "600",
  },
  moreOrders: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    color: appTheme.COLORS.MainOrange,
    marginTop: 15,
  },
  orderDateTimeContainer: {
    flexDirection: "row",
  },
  orderStore: {
    marginBottom: 2,
    fontSize: 16,
    color: appTheme.COLORS.textGray,
  },
  orderDate: {
    marginRight: 5,
    color: appTheme.COLORS.textGray,
  },
  header: {
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    elevation: 6,
  },
  headerNotification: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerHome: {
    fontSize: 18,
    fontWeight: "700",
  },
  headerNotificationText: {
    fontSize: 18,
  },
  totalSalesStats: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  deliveriesStats: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 30,
  },
  statsText: {
    color: appTheme.COLORS.white,
    fontSize: 18,
  },
  totalSalesAmount: {
    color: appTheme.COLORS.white,
    ...appTheme.FONTS.mainFontBold,
    fontSize: 30,
  },
  deliveriesAmount: {
    color: appTheme.COLORS.white,
    fontWeight: "700",
    fontSize: 23,
  },
  totalVisitAmount: {
    color: appTheme.COLORS.white,
    fontWeight: "700",
    fontSize: 23,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
  },
});
