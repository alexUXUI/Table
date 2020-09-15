# Restaurant Table
Table that shows restaurants!

## Up and Running
```
$ git clone git@github.com:alexUXUI/restaurant-table.git
$ cd restaurant-table
$ npm i --silent && npm start
```

### Notes

I did some things well, but there also some things I could have done a lot better. here are my thoughts:

1) I tried to focus on reusability but also still have some type saftey so I leveraged typescript generics for the project. 

2) In the interest of time, there were a couple of user stories that I didn't adhere 100% to or maybe even do at all.
The submit button of the global search is an example of something I conciously had to 
not implement due to time. Otherwise, I would have built this thing according to the specs.

3) That being said, I think the core funcitonality works well. The combination of the filters, sorting, and pagination is the crux of this technical challenge in my opionion so I tried to handle that decently.

Areas for improvement:
1) The filter function is way too imperative and I would remove all the imperative bits to make it more resuable, but,
in the meantime, the table itself is still resuable despite the imperative filter because the
developer gets to specify the filter function as a part of the table component usage.

2) Another thing I would have done for a massive performace improvement is debounce all the input fields to
prevent the expense filter operations from running so much. 

3) The CSS also isn't anything to write home about. For bigger projects I normally love the comibation of BEM and SASS.

Here's how I would have done all the things I didn't do:
- Had I united-tested the table component I would have used Kent Dodds testing-library/react
- Had I deoplyed I would have deployed on heroku using a CRA build-pack - mainly for convenience 
- Had I actually used gitflow for this project I would have used conventional, descriptive 
    commits and feature branches off of a dev that are then PR'd in test, and main branch. 
- Had I used CI/CD I propbably would have used heroku's pipeline. Mainly because I'd already be on their cloud also because it seems
well made - never used it. I have used jenkins, aws codepipeline, circleCI, and concourse CI/CD solutions though. 

