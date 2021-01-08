# Ecosystem Project 5: Autonomy

Fifth project as I make my way through "The Nature of Code". This project is a huge milestone in that we are now modeling behaviors through a vehicle's desire. A fish is actually getting scared and feels the desire to turn away from the shark vs. the shark detecting whether or not a fish is within it's radius and imparting a force to it. In the real world, does a shark make a fish swim away via some form of emotional telepathic manipulation? Or is it that the fish is afraid of a shark and wants to swim away? I think the latter is more accurate.

This code was optimized by reducing the amount of vector objects created and by using a cos/sine lookup tables instead of calculating tail location & movement. 

How could this project be improved?
- Hunting Behavior for Shark:
Be able to lock onto one fish when it enters a range and track it until out of range

- Tail Movement: 
I had previously designed an algorithm that related the tails oscillation to its velocity but that wasn't completely accurate. It should be related to the acceleration, however, acceleration in my code was always limit to a max of .05 so it
is constant... On top of that, any minute change in the period was causing the tail to jump locations so it made it seem that the tail was actually swimming faster even as the fish was slowing down. 

- Edge Cases: 
Although the fish can wrap around the page, their fear of a shark doesn't extend around the edges. Possible solution would be to create an invisible shark which mirrors the position of the real shark so that fish get scared. 

- UX/UI: 
The controls could all be help within one "controls" button/container that drops down when clicked. 

- Population Control: 
Allow the user to increase or decrease the size of the population! 


