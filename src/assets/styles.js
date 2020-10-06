
// let primaryColor = '#FB0B04';
let primaryColor = 'green';
let secondaryColor = 'white';

let styleHeader = {
    width: '100%',
    height: 60,
    backgroundColor: primaryColor,
};

let styleHeaderTitle= {
    fontSize: 22,
    // fontWeight: 'bold',
    color: secondaryColor,
    paddingLeft: 15,
};

let styleFooter = {
    width: '100%',
    height: 60,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
};

export default {
    styleHeader,
    primaryColor,
    styleHeaderTitle,
    styleFooter
}