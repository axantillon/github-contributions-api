const axios = require('axios')
const express = require('express');

const router = express.Router();

async function getContributionsJSON(username) {
    return await axios.get(`https://github-contributions.now.sh/api/v1/${username}`)
}

router.get('/:username', async (req, res) => {
    const contributions = await getContributionsJSON(req.params.username)
    
    res.send(contributions.data)
})

router.get('/years/:username', async (req, res) => {
    const contributions = await getContributionsJSON(req.params.username)
    
    res.send(contributions.data.years)
})

router.get('/years/months/:username', async (req, res) => {
    var contributions = await getContributionsJSON(req.params.username)
    var totalContributions = {
        years: [],
    }

    contributions.data.years.forEach(element => {
        years = contributions.data.contributions.filter(entry => entry.date.includes(element.year))

        var yearlyContributions = {
            year: element.year,
            months: []
        }

        for(i=1; i <= 12; i++){

            if(i < 10 ){
                yearlyContributions.months.push({
                    "month": i,
                    "count": years.filter(date => date.date.includes(`-0${i}-`)).reduce((previous, current) => {
                                return previous + current.count
                            }, 0)
                })

            }else{

                yearlyContributions.months.push({
                    "month": i,
                    "count": years.filter(date => date.date.includes(`-${i}-`)).reduce((previous, current) => {
                                return previous + current.count
                            }, 0)
                })
            }
        }

        totalContributions.years.push(yearlyContributions)
    });

    res.send(totalContributions)
})

module.exports = router;