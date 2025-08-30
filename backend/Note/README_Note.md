uuid	8c3fc5d5-3d77-4743-823d-54dad12c745e	
user_welcomed	true	
user_group	GROUP_A	
showReleaseNotificationFlag	false	
records	{"Apr 1":{"ads":739,"content":0,"malwares":1,"scams":0,"ts":1743440400000},"Apr 10":{"ads":2207,"content":0,"malwares":0,"scams":0,"ts":1744218000000},"Apr 11":{"ads":827,"content":0,"malwares":0,"scams":4,"ts":1744304400000},"Apr 2":{"ads":805,"content":0,"malwares":0,"scams":0,"ts":1743526800000},"Apr 3":{"ads":411,"content":0,"malwares":0,"scams":0,"ts":1743613200000},"Apr 4":{"ads":391,"content":0,"malwares":0,"scams":4,"ts":1743699600000},"Apr 5":{"ads":683,"content":0,"malwares":0,"scams":0,"ts":1743786000000},"Apr 6":{"ads":308,"content":0,"malwares":0,"scams":0,"ts":1743872400000},"Apr 7":{"ads":1128,"content":0,"malwares":0,"scams":0,"ts":1743958800000},"Apr 8":{"ads":656,"content":0,"malwares":0,"scams":0,"ts":1744045200000},"Apr 9":{"ads":731,"content":0,"malwares":0,"scams":0,"ts":1744131600000},"Mar 31":{"ads":1105,"content":0,"malwares":0,"scams":34,"ts":1743354000000}}	
nativeHostStatus	true	
mv3RulesetSelection	["mbgc.mv3.whitelist_1","mbgc.mv3.ads_1","mbgc.mv3.ads_2","mbgc.mv3.malware_1","mbgc.mv3.easylist_1","mbgc.mv3.easyprivacy_1","mbgc.arw"]	
mv3DisabledRules	[{"ruleId":23150,"ruleset":"mbgc.mv3.ads_1"}]	
mbamVersion	{"cuVersion":"130.0.5212","duVersion":"1.0.97955","prodBuild":"consumer","prodCode":"MBAM-C","prodVersion":"5.2.10.182"}	
machineId	e4d9f0247b426dbca6712628386a3481f6902844	
localIpWhitelisting	true	
licenseTermPrivacy	unlicensed	
licenseTermPremium	perpetual	
licenseStatePrivacy	1	
licenseStatePremium	4	

https://github.com/kongnakornna/backendcmon/blob/main/src/controllers/autorun.ts
https://github.com/kongnakornna/cmonmonitoring
//console.log('**************************'); 
     //console.log('case 1 data=>'); console.info(data); 

     let tempData = [];
      let tempDataoid = [];
      let tempData2 = [];
      for (const [key, va] of Object.entries(Result)) {
              // เอาค่าใน Object มา แปลง เป็น array แล้วนำไปใช้งาน ต่อ
              const oid:string= Result[key].oid || null;  
              const data = { oid: oid } 
              tempDataoid.push(oid); 
              tempData.push(va); 
              tempData2.push(data); 
      }


system
Na@0955@#


https://www.sent.dm/resources/sinch-node-js-nestjs-basic-send-sms

