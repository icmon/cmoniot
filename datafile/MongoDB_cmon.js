/*
 Navicat Premium Dump Script

 Source Server         : MongoDB
 Source Server Type    : MongoDB
 Source Server Version : 50002 (5.0.2)
 Source Host           : localhost:27017
 Source Schema         : cmon

 Target Server Type    : MongoDB
 Target Server Version : 50002 (5.0.2)
 File Encoding         : 65001

 Date: 28/05/2025 13:03:22
*/


// ----------------------------
// Collection structure for system.views
// ----------------------------
db.getCollection("system.views").drop();
db.createCollection("system.views");

// ----------------------------
// Documents of system.views
// ----------------------------

// ----------------------------
// Collection structure for user2
// ----------------------------
db.getCollection("user2").drop();
db.createCollection("user2");

// ----------------------------
// Documents of user2
// ----------------------------
db.getCollection("user2").insert([ {
    _id: ObjectId("67f6691381503fa94b02cef2"),
    id: Int32("1"),
    firstName: "demo",
    lastName: "demo",
    age: Int32("10"),
    email: "",
    fullname: ""
} ]);
db.getCollection("user2").insert([ {
    _id: ObjectId("67f6691381503fa94b02cef3"),
    id: Int32("2"),
    firstName: "demo2",
    lastName: "demo2",
    age: Int32("20"),
    email: "",
    fullname: ""
} ]);

// ----------------------------
// Collection structure for user_history
// ----------------------------
db.getCollection("user_history").drop();
db.createCollection("user_history");
db.getCollection("user_history").createIndex({
    history_id: Int32("1"),
    user_ip: Int32("1"),
    member_id: Int32("1")
}, {
    name: "history_id"
});
db.getCollection("user_history").createIndex({
    history_content_id: Int32("1")
}, {
    name: "history_content_id"
});

// ----------------------------
// Documents of user_history
// ----------------------------

// ----------------------------
// Collection structure for user_log
// ----------------------------
db.getCollection("user_log").drop();
db.createCollection("user_log");
db.getCollection("user_log").createIndex({
    ref_id: Int32("1")
}, {
    name: "ref_id"
});
db.getCollection("user_log").createIndex({
    member_id: Int32("1")
}, {
    name: "member_id"
});

// ----------------------------
// Documents of user_log
// ----------------------------

// ----------------------------
// Collection structure for user_log_activity
// ----------------------------
db.getCollection("user_log_activity").drop();
db.createCollection("user_log_activity");
db.getCollection("user_log_activity").createIndex({
    user_id: Int32("1"),
    ref_id: Int32("1")
}, {
    name: "index"
});

// ----------------------------
// Documents of user_log_activity
// ----------------------------
