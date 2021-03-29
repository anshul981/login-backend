const mongoose = require('mongoose');

// mongoose.connect('mongodb://admin:admin123@ds219078.mlab.com:19078/ricruitermgmt_dev', (err) => {
//     if (!err){
//         console.log('MongoDB connected Successfully');
//     }else {
//         console.log('Connection failed' + JSON.stringify(err, undefined, 2));
//     }
// });
mongoose.connect('mongodb+srv://admin:admin123@cluster0.1kqsd.mongodb.net/meanAuth?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB connected Successfully');
    } else {
        console.log('Connection failed' + JSON.stringify(err, undefined, 2));
    }
});
// mongoose.connect('mongodb://localhost:27017/CrudDB',{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (!err){
//         console.log('MongoDB connected Successfully');
//     }else {
//         console.log('Connection failed' + JSON.stringify(err, undefined, 2));
//     }
// });

module.exports = mongoose;
