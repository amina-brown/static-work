
earthquakes_raw = read.csv("significant_month.csv")

earthquakes = earthquakes_raw[earthquakes_raw$magType == "mww",c("mag","place","time")]
earthquakes$place = as.character(earthquakes$place)

for (i in 1:nrow(earthquakes)){
earthquakes$place[i] = unlist(strsplit(earthquakes$place[i],", "))[2]
}

earthquakes$place[is.na(earthquakes$place)] = "Atlantic Ocean"

mag = aggregate(earthquakes[, 1], list(earthquakes$place), mean)
vol = aggregate(earthquakes[, 1], list(earthquakes$place), length)

eq_final = merge(mag,vol,by = "Group.1")

eq_final$diameter = 10^(eq_final$x.x)/1000000


eq_sep1 = earthquakes[grep("2020-09-01",earthquakes$time), ]

eq_sep1$diameter = 10^(eq_sep1$mag)/750000
