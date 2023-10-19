const query = {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021"
          ]
        }
      },
      {
        "code": "Alue",
        "selection": {
          "filter": "agg:_Municipalities in alphabetical order 2023.agg",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "vm01",
            "vm11",
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
}

/*        "vm01", Syntymät - aktiivinen
          "vm11", Kuolemat - aktiivinen
          "vm43_tulo", Muutto sisään
          "vm43_lahto", Muutto ulos
          "vm2126", Naimisiin
          "vm3136", Erot
          "vaesto" Väestön määrä
*/

//From 