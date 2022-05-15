import { StyleSheet, View } from "react-native";
import { Col, Row, Table, TableWrapper } from "react-native-table-component";
import React from "react";
import { AppColor, FONTS, White } from "../constants";
import { wh } from "../helpers";

export const RenderTable = ({ timeObj }) => {
  return(
    <View style={{marginTop:wh(.01)}}>
      <Table >
        <Row data={["Hour","Minutes"]} flexArr={[1.8, 4.5]} style={styles.head} textStyle={{...styles.text,color:White}} />
        {
          Object.entries(timeObj).map(item => {
            return(
              <TableWrapper style={styles.wrapper}>
                <Col data={[item[0]]} style={styles.row} textStyle={styles.text}/>
                <Col data={[item[1].join(", ")]} style={styles.row2} textStyle={styles.text}/>
              </TableWrapper>
            )
          })

        }
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: AppColor  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28,flex:2  },
  row2: {  height: 28,flex:5  },
  text: { textAlign: 'center',fontFamily:FONTS.semi },
});
