# bored_app
 [Demo](http://boredapp.ionhosting.hu/)
``` 
npm install -g @vue/cli
``` 
``` 
npm install 
``` 
``` 
npm  run serve
``` 


#### public/config/data.json

``` 
{
    "labels":{
        "activity_title":"Activity", 
        "activity_list_title":"Activity List",
		"empty_list":"No activity saved. Go to Search and add Activity to list",		
        "title":"You Should",
        "activity_filter":"Hit me with a new one!",
        "save":"Save for later",
        "price_min":"Cheap",
        "price_max":"Exp.",
        "price":"Price",
        "participants":"Participants",
        "type":"Type",  
        "no_activity_title":"Sorry,",    
        "free_range":"Free",
        "cheap_range":"Cheap",
        "expensive_range":"Exp.",
        "clear_list":"Clear List"
    },
    "defaults":{
        "settings":{
            "price_range_precision":2,
            "price_ranges":{
                "free_range":[0,0],
                "cheap_range":[0,0.3],
                "expensive_range":[0.3,1]
            }  
        },
        "form":{
            "key":null,
            "activity":"waiting for suggestion",
            "price":[0,1],
            "participants":1,
            "type": null
        },
        "rules": {
            "participants":{
                "min":1,
                "max":10
            }
        },
   
        "types" :  [
            { "value": "education", "text":"education", "s_name":"Edu", "display":{"bg_color":"green","color":"white"} },
            { "value": "recreational","text":"recreational", "s_name":"Rec", "display":{"bg_color":"indigo","color":"white"}  },
            { "value": "social","text":"social", "s_name":"Soc", "display":{"bg_color":"blue","color":"white"}  },
            { "value": "diy" ,"text":"diy", "s_name":"Diy", "display":{"bg_color":"blue","color":"white"}  },
            { "value": "charity","text":"charity", "s_name":"Cha", "display":{"bg_color":"pink","color":"white"}  },
            { "value": "cooking","text":"cooking", "s_name":"Coo", "display":{"bg_color":"orange","color":"white"}  },
            { "value": "relaxation","text":"relaxation", "s_name":"Rel", "display":{"bg_color":"blue","color":"white"}  },
            { "value": "music" ,"text":"music", "s_name":"Mus", "display":{"bg_color":"green","color":"white"}  },
            { "value": "busywork","text":"busywork", "s_name":"bWo", "display":{"bg_color":"red","color":"white"} } 
          ], 
        "type_display":{"bg_color":"black","color":"white"}
    }
}
 ```
 
