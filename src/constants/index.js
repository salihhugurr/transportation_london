import { StyleSheet } from "react-native";
import { wh, ww } from "../helpers";

export const AppColor = "#6C7BFB";
export const Secondary = "#CB3845";
export const White = "#FEFEFE";
export const FONTS = {
  bold: "Oswald-Bold",
  semi: "Oswald-SemiBold",
  medium: "Oswald-Medium",
  regular: "Oswald-Regular",
  light: "Oswald-Light",
  extraLight: "Oswald-ExtraLight",
};
export const textSize = ww(.027);
export const titleSize = ww(.04);
export const mediumSize = ww(.033);

export const STYLES = StyleSheet.create({
  modes: {
    width: ww(.4),
    margin: ww(.02),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: ww(.35),
    backgroundColor: "#FEFEFE",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.33,
    shadowRadius: 2.0,
    elevation: 1,
  },
  lineWrapper: {
    width: ww(),
    padding: ww(.03),
    paddingVertical:wh(.02),
    flexDirection: "row",
  },
  centeredRow: { flexDirection: "row", alignItems: "center" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  modeText: { fontSize: mediumSize, marginTop: wh(.01), fontFamily: FONTS.medium, color: "#666" },
  lineNameText:{fontSize:mediumSize,marginHorizontal:ww(.02),fontFamily:FONTS.semi,color:"#666",textAlign:"center"},
  modeIconWrapper: {padding:ww(.04),borderRadius:20},
  searchWrapper: {
    marginTop: wh(0.01),
    marginBottom: wh(0.01),
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
    width: '100%',
    height: wh(0.05),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.66,
    shadowRadius: 2.0,
    elevation: 2,
  },
  search: {
    paddingLeft: '3%',
    width: ww(0.8),
    height: '100%',
  },
  barcodeTopView: {
    width: ww(),
    height: wh(.12),
    marginTop: wh(.05),
    backgroundColor: AppColor,
    justifyContent: "center",
    alignItems: "center"
  },
  barcodeCloseButton: {position: "absolute", right: ww(.04), top: wh(.07)},
  qrButtonView: {
    zIndex: -1,
    width: ww(),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: wh(.05),
    paddingHorizontal: ww(.04)
  },

});
