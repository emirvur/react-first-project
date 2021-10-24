export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return userStr;//JSON.parse(userStr);
    else return null;
  }
  /*
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('user');
  }
  
  // set the token and user from the session storage
  export const setUserSession = ( user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }*/
/*

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
*/