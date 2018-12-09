/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test loops through each feed in the allFeeds
     * object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('each has a URL', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.constructor).toBe(String)
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* This test loops through each feed in the allFeeds
     * object and ensures it has a NAME defined
     * and that the name is not empty.
     */
    it('each has a name', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.constructor).toBe(String)
        expect(feed.name.length).not.toBe(0);
      }
    });
  });


  /* Test suite "The Menu" */
  describe('The Menu', function() {
    /* This test ensures the menu element is
     * hidden by default.
     */

    it('is hidden by default', function() {
      let isHidden = document.body.classList.contains('menu-hidden')
      expect(isHidden).toBe(true);
    });

    /* This test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * has two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('toggles the view when icon is clicked', function() {
      let menuIcon = document.querySelector('.menu-icon-link');
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(false);
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBe(true);
    });
  });

  /* Test suite "Initial Entries" */
  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(1, done);
    });

    /* This test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('has at least a single entry within the feed container', function() {
      let numberEntries = document.querySelector('div.feed');
      let entries = numberEntries.querySelectorAll('article.entry')
      expect(entries.length).toBeGreaterThan(0);
    });
  });

  /* Test suite "New Feed Selection" */
  describe('New Feed Selection', function() {
    let initFeedSelection, newFeedSelection;

    beforeEach(function(done) {
      loadFeed(3, function() {
        initFeedSelection = document.querySelector('div.feed').innerHTML;
        loadFeed(2, function() {
          newFeedSelection = document.querySelector('div.feed').innerHTML;
          done();
        });
      });
    });

    /* This test  ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    it('content loads new feeds', function() {
      expect(initFeedSelection).not.toBe(newFeedSelection);
    });
  });
}());
