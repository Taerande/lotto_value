const app = require('express')()
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const db = admin.database();


app.use([cors(),bodyParser.json()]);

app.get('/lotto', async (req, res) => {
    try {
        // query값들 중복 체크 필요함.
        let result = [];
        let totalPrzie = 0;
        let winStat = {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0
        };
        let opCost = 0;
        let lottoDb;
        let draws = [req.query.dr1 * 1, req.query.dr2 * 1, req.query.dr3 * 1, req.query.dr4 * 1, req.query.dr5 * 1, req.query.dr6 * 1];
        let ref = db.ref('/lotto');
        await ref.once('value', (sn) => {
            lottoDb = sn.val();
        });
        for (let key in lottoDb) {
            let point = 0;
            let bonusPoint = false;

            if (lottoDb[key].no < 88) {
                opCost += 2000
            } else {
                opCost += 1000
            }

            draws.includes(lottoDb[key].dr1) === true ? point += 1 : '';
            draws.includes(lottoDb[key].dr2) === true ? point += 1 : '';
            draws.includes(lottoDb[key].dr3) === true ? point += 1 : '';
            draws.includes(lottoDb[key].dr4) === true ? point += 1 : '';
            draws.includes(lottoDb[key].dr5) === true ? point += 1 : '';
            draws.includes(lottoDb[key].dr6) === true ? point += 1 : '';
            draws.includes(lottoDb[key].drbonus) === true ? bonusPoint = true : bonusPoint = false;
    
            if (point === 3) {
                // 5등
                result.push({
                    no: lottoDb[key].no,
                    rank: 5,
                    data: lottoDb[key],
                    prize: lottoDb[key].fifth
                })
                totalPrzie += lottoDb[key].fifth;
                winStat.fifth += 1;
            } else if (point === 4) {
                // 4등
                result.push({
                    no: lottoDb[key].no,
                    rank: 4,
                    data: lottoDb[key],
                    prize: lottoDb[key].fourth
                })
                totalPrzie += lottoDb[key].fourth;
                winStat.fourth += 1;
            } else if (point === 5 && !bonusPoint) {
                // 3등
                result.push({
                    no: lottoDb[key].no,
                    rank: 3,
                    data: lottoDb[key],
                    prize: lottoDb[key].third
                })
                totalPrzie += lottoDb[key].third;
                winStat.third += 1;
            } else if (point === 5 && bonusPoint) {
                // 2등
                result.push({
                    no: lottoDb[key].no,
                    rank: 2,
                    data: lottoDb[key],
                    prize: lottoDb[key].second
                })
                totalPrzie += lottoDb[key].second;
                winStat.second += 1;
            } else if (point === 6) {
                // 1등
                result.push({
                    no: lottoDb[key].no,
                    rank: 1,
                    data: lottoDb[key],
                    prize: lottoDb[key].first
                })
                totalPrzie += lottoDb[key].first;
                winStat.first += 1;
            }
        }
        res.send({ result: result, total: totalPrzie, winStat:winStat, opCost: opCost });
    }
    catch {
        res.send({ e: 'error' });
    }
});

app.get('/pension', async (req, res) => {
    try {
        let draws = [req.query.dr6 * 1, req.query.dr5 * 1, req.query.dr4 * 1, req.query.dr3 * 1, req.query.dr2 * 1, req.query.dr1 * 1, req.query.trill*1];
        let pensionDb;
        let opCost = 0;
        let result = [];
        let totalPrzie = 0;
        let winStat = {
            "bonus": 0,
            "7": 0,
            "6": 0,
            "5": 0,
            "4": 0,
            "3": 0,
            "2": 0,
            "1": 0,
        };
        let ref = db.ref('/pension');
        await ref.once('value', (sn) => {
            pensionDb = sn.val();
        });
    
        for (let key in pensionDb) {
            const winArr = pensionDb[key].win.toString().split('').reverse();
            const bonusArr = pensionDb[key].bonus.toString().split('').reverse();
            bonusArr.push('0');
            let point = 0;
            let bonus = 0;
            opCost += 1000
            for (let i = 0; i < draws.length; i++){
                if (draws[i] === winArr[i] * 1) {
                    point += 1
                } else {
                    break;
                }
            }
            for (let i = 0; i < draws.length; i++){
                if (draws[i] === bonusArr[i] * 1) {
                    bonus += 1
                } else {
                    break;
                }
            }
            if (bonus === 6) {
                // 보너스 당첨
                result.push({
                    no: pensionDb[key].no,
                    rank: 'bonus',
                    prize:120000000,
                    data: pensionDb[key],
                })
                totalPrzie += 120000000;
                winStat['bonus'] += 1;
            }
    
            if (point === 1) {
                // 7등
                result.push({
                    no: pensionDb[key].no,
                    rank: 7,
                    prize:1000,
                    data: pensionDb[key],
                })
                totalPrzie += 1000;
                winStat['7'] += 1;
            } else if (point === 2) {
                // 6등
                result.push({
                    no: pensionDb[key].no,
                    rank: 6,
                    prize:5000,
                    data: pensionDb[key],
                })
                totalPrzie += 5000;
                winStat['6'] += 1;
            } else if (point === 3) {
                // 5등
                result.push({
                    no: pensionDb[key].no,
                    rank: 5,
                    prize:50000,
                    data: pensionDb[key],
                })
                totalPrzie += 50000;
                winStat['5'] += 1;
            } else if (point === 4) {
                // 4등
                result.push({
                    no: pensionDb[key].no,
                    rank: 4,
                    prize:100000,
                    data: pensionDb[key],
                })
                totalPrzie += 100000;
                winStat['4'] += 1;
            } else if (point === 5) {
                // 3등
                result.push({
                    no: pensionDb[key].no,
                    rank: 3,
                    prize:1000000,
                    data: pensionDb[key],
                })
                totalPrzie += 1000000;
                winStat['3'] += 1;
            } else if (point === 6) {
                // 2등
                result.push({
                    no: pensionDb[key].no,
                    rank: 2,
                    prize:120000000,
                    data: pensionDb[key],
                })
                totalPrzie += 120000000;
                winStat['2'] += 1;
            } else if (point === 7) {
                // 1등
                result.push({
                    no: pensionDb[key].no,
                    rank: 1,
                    prize:1680000000,
                    data: pensionDb[key],
                })
                totalPrzie += 1680000000;
                winStat['1'] += 1;
            }
        }
        res.send({ result: result, total: totalPrzie, winStat: winStat, opCost: opCost });
    }
    catch {
        res.send({ e: 'error' });
    }


});

module.exports = app