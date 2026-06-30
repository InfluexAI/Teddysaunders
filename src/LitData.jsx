/* ============================================================
 *  LitData — the written contents of Ted Saunders' literary wing.
 *  Sample copy in Ted's voice; swap real text in later.
 *  Exposed as window.LIT_DATA.
 * ============================================================ */
(function () {
  // ---- The Book of Ignorance — an evolving framework of virtues ----
  const VIRTUES = [
    { rune: "\u16B1", name: "Wonder", line: "To meet the world as if for the first time, and the thousandth." },
    { rune: "\u16A6", name: "Humility", line: "The wisest sentence I know still ends in a question." },
    { rune: "\u16DE", name: "Surrender", line: "Not defeat. The art of letting the river carry what you cannot." },
    { rune: "\u16C1", name: "Presence", line: "The only country I have never been exiled from is now." },
    { rune: "\u16D6", name: "Devotion", line: "To return, and return, to the thing that asks everything of you." },
    { rune: "\u16A0", name: "Courage", line: "To walk into the dark holding nothing but the next step." },
    { rune: "\u16C9", name: "Stillness", line: "Beneath every answer is a silence that knew it first." },
    { rune: "\u16E1", name: "Reverence", line: "To treat the ordinary as if it were on loan from the sacred." },
  ];

  // ---- TedThoughts — short philosophical fragments, each opens into the reader ----
  const POEMS = [
    { tag: "TedThought", title: "", lines: ["A fragile ego doesn't want to be wrong and wants to prove that they know best. An egoless person knows they can't know everything and is open learning new things while not needing to prove anything."] },
    { tag: "TedThought", title: "", lines: ["Any given argument is usually just two egos that refuse to listen. The remedy to create a solution is deep presence and listening."] },
    { tag: "TedThought", title: "", lines: ["Some things don't need to be figured out. Sometimes you just gotta let go and trust that the storm will pass."] },
    { tag: "TedThought", title: "", lines: ["Happiness is when you are courageously moving towards what you fear, knowing that it's not only possible, but also incredible, exciting and fulfilling."] },
    { tag: "TedThought", title: "", lines: ["The more noise outside you, the easier it is to find peace inside. For example, when at crowded or noisy places with many people, you stand out less, therefore you can connect deeper with your own essence.", "When one-on-one or in small groups, you have to be seen and can't hide."] },
    { tag: "TedThought", title: "", lines: ["Scarcity creates value.\nEx: Release music video before an actual song"] },
    { tag: "TedThought", title: "", lines: ["Grudges are traps. Forgiveness is freedom."] },
    { tag: "TedThought", title: "", lines: ["Stories and judgements are excellent ways to avoid happiness of the presence. Remove your judgements/stories and become free in the infinite bliss of here and now."] },
    { tag: "TedThought", title: "", lines: ["Anyone who says that they are healed and done learning or healing is never done healing. That's their ego trying to have pride, which shows that there is more work to do. A healed person knows that they can't know all and that's ok."] },
    { tag: "TedThought", title: "", lines: ["Don't tell people your goals. Instead, show them your achievements."] },
    { tag: "TedThought", title: "", lines: ["Chills don't lie."] },
    { tag: "TedThought", title: "", lines: ["You won't know how good you are until you put yourself out there."] },
  ];

  // ---- Articles / Essays — philosophical transmissions ----
  const ESSAYS = [
    { imgKey: "hyperlapse",            img: "assets/hyperlapse.jpg",            date: "JAN 14, 2025", title: "The Art of the Hyperlapse" },
    { imgKey: "videoEditing",          img: "assets/video-editing.png",          date: "JAN 14, 2025", title: "The Art of Documentary-Style Video Editing" },
    { imgKey: "sixReasonsWix",         img: "assets/6-reasons-wix.jpg",          date: "JAN 03, 2025", title: "6 reasons why Wix, Squarespace and Wordpress are not good enough" },
    { imgKey: "emotionalStorytelling", img: "assets/emotional-storytelling.jpg", date: "DEC 27, 2024", title: "The Art of Emotional Storytelling in a World of AI" },
    { imgKey: "aiEndUs",               img: "assets/ai-end-us.jpg",              date: "DEC 27, 2024", title: "AI is going to end us - but you might not have to \"die\"" },
    { imgKey: "animatedExplainer",     img: "assets/animated-explainer.jpg",     date: "DEC 08, 2024", title: "6 Essential Points when Creating an Animated Explainer Video" },
  ];

  // ---- Poems — objects with title, date, content ----
  const THOUGHTS = [
    {
      title: "One second shits of moments.",
      date: "7/12/2013",
      content: `Did you catch that?

Those were moments created from decisions that took a split second of action.

You see our minds think fast. And one little smile or hello can change your entire destiny.

Like right now. I could do this. Or this. Or this. It's all up to me.

Because we. Are each a miracle. An individual. With the power to shift.`,
    },
    {
      title: "Sometimes when I'm feeling stressed",
      date: "3/25/2014",
      content: `Sometimes when I'm feeling stressed
I remind myself, just do your best
For best is all that one can do
And there's no need for feeling blue.

And when you feel you have no time
Remind yourself, it's in your mind
For time is just a silly thing
That humans made to measure lines.`,
    },
    {
      title: "To My Mother",
      date: "5/3/2014",
      content: `There once was a mother unique as can be
Because she's the mother who gave birth to me.
If it wasn't for her, I'd be but a blur
So I'm thankful for the time she spent raising we.

My sister and I, are the people we are,
Because of my mother commitment thus far,
She nurtured us well,
And gave us hell.
But mostly when blasting the bass from my car.

So thank you mom. For being the bomb. For singing us songs and keeping us calm.
For trusting that we would be safe when we play.
For teaching us things and showing the way.

Thank you for craftfully cooking us meals and thank you for truth in keeping us real.
Without you dearest mom, we wouldn't be us. Never making a fuss because we have trust.

I wish I could see you more offten these days,
but I'm glad that you let me explore life's great maze.
I love you dearest mom
So here is a poem
To show you how proud that I am to say...

My mom is the best. I wouldn't change a hair. She's perfect and beautiful and smart and she cares.
So cheers to you boo.
The mom that's so coo.
I hope that you know how much we love you.`,
    },
    {
      title: "Damn. Life is but a sham.",
      date: "9/20/2015",
      content: `Damn. Life is but a sham.
Said the lamb. To the wolf.

In sheeps clothing.
"But why the loathing?"

Said the wolf.`,
    },
    {
      title: "Perhaps its phony to say that I'm lonely.",
      date: "1/8/2017",
      content: `Perhaps its phony to say that I'm lonely.
I have have many friends, some lovers some homeys.

Perhaps what I long for in these winter days.
Is someone to wake up next to, a partner in play.

For my heart is beating a steady slow pace,
And its not up to me to make my heart race.

By love, by excitement or feeling reborn.
Not sure if I'm lonely. Not sure if I'm torn.

I feel overwhelmed by the projects unfinished.
My justification to hang, it feels quite diminished.

With so many goals that I strive for in life.
Those must be more simple, when you have a wife.

As cool as my friends are, those goals still hold heavy.
So I isolate myself, until I am ready.

To play and to say yes to anything there.
But for now I'll stay lonely and focused right here.

Yet here I am sharing, not getting shit done.
Staying connected because its more fun.

Grateful to be with a community.
But for now I'll unplug and be friends with this tree.`,
    },
    {
      title: "Sunday",
      date: "2/6/2017",
      content: `Sunday

You say we've come so far but darlin this has just begun.
Cause I dont know myself enough to say that we have won.
But I see futures thriving high for us to navigate
Into an orbit undenying of our timeless fate.
yes I do, I do I do I do I do

I sat upon the sand to contemplate my bride in hand.
And wrote a list of all the things that I felt would be grand.
That list was named "my almost perfect woman" so my sane self knew that Id find faults inside this imperfect thing
that I thought knew, I knew I knew I knew

Now I don't claim to be a seer, but my imagination's clear
All that you have to do is take my pen and write our story here.
Cause I will follow what you preach and I will guide you with no leash. And I will queen you with my truth
That I promise yes I do, I do I do I do I do I do

As though the clouds were just right there, but then you walk in and its mist.`,
    },
  ];

  // ---- TedLyrics — song fragments, sung lines ----
  const LYRICS = [
    {
      title: "This is a story about some sorcerers living on this planet knowing…",
      date: "4/18/2016",
      content: `This is a story about some sorcerers living on this planet knowing that their force of words aren't given granted because everything do and say are spells casted powerful to change our destinay.

So shoot the magic out your fingertips, out your hips, out your lips knowing it's a gift
to up lift every person, every moment lived, around you; to be the party for those feeling blue.

What I'm saying is that there is nothing you can't do; with this magic that you have deep inside of you. Any moment you can choose to be the light you spread. Even if alone and feeling trapped inside your head.

Cause sorceress know that hexes are a state of mind. And enchantments can effect you in a wink of time. But knowing YOU are the one who is the wizard here. How about you make an aura for those far and near.

CHORUS:
Cause we are we are the magic and it feels so right.
We are we are the magic and we spread that light.
X2

This second verse is about the curse: Knowing that we are the same yet have different brains.
Because you and I yes we both are one consciousness; experiencing itself from two different rifts.

But knowing we're the same light
makes it hella tight--the same source of course, sharing the same force.
Connected deeper than we'll ever really know. With His life effected strongly from Her clever flow.

The power's in our hands to be each others glee. Perhaps by droppin' pants or bouncin' round with your titties--to make a smile that we both enjoy for miles. That's why we're here together in this super sexy pile.

So thank you for what you contribute.
For sharing things and speaking up when your typically mute. And for your magic that we hardly ever see. To me this magic is what makes us all Resourcery.

CHORUS:
Cause we are we are the magic and it feels so right.
We are we are the magic and we spread that light.
X2

you The sparkle pony or the sincere hug to smoke a Spliff get it lit and uplift to the fifth d. Mention to infinity. Cause you and me together we write the story if the destiny they didn't see. Coming disruptive original in every way, created from the games we played, on these grounds we made, and this trust we must

Cause we are, we are the magic and it feels so right.
We are we are the magic,
Cause these stars theses stars inside us make us shine so bright.`,
    },
    {
      title: "This is a story about a boy named Ted.",
      date: "1/14/2017",
      content: `This is a story about a boy named Ted.
Who has pictures of dragons and wizards next to his bed.
He was a kid, with a dream to tell the stories in his head.
Seeing life through the lens of a camera once gifted.

In the flow. With a sense of magic in his mind.
In class he would write tales bout lives on the line.
Then after class, Ted, Alex and Jesse hit the bags.
Full of props, 14 years old and playing roles of cops.

Then in high, school he won awards for his edits,
Flashed through four years of college with production as his credits.

The left boston, and moved straight to Hollywood,
Where he knew he would meet the people that new whats good.

An adult, now responsible to pay his bills with his skills.
Making a new video, every two weeks to build his reel.

Then at 26, he hit his first streak.
And went from 12 Subscribers, to a million views in one week.

Living his dream, pouring out his soul onto the screen.
Writing directing whimsical films told bout the deepest of his being.

An explorer, - of art, wellness, technology an oras.
In awe and excitement of the glory coming toward us.

A ninja bro, in his words, edits and in the flow.
Of thoughtless genuine stories bout humans in growth.

Building Solar power video booths, then capturing dreams with em.
Designing tech to get the people to connect.

A creative mind, designing the fine details of lines in time.
Setting pace for new projects he's never faced.

Now what today, could this humble guy ask to become his fate.
Just for you to know he's here and ready to take on the day.

So come what may, it doesn't have to pay but hey it helps that way.
Im here to serve, and swerve in ways that birth the thoughts of our best days.

Whether to come, or having been, wether a blessing or a sin,
May these images be felt, cause both of us deserve this win.

This is my Reel.
An expression of things I feel.
To show you who. You should give your attention to.

God bless you.`,
    },
    {
      title: "She had them hips right. Tight jeans and the crop top.",
      date: "5/26/2025",
      content: `Abs like a snake, torso like a hot dog.
Smooth like buddah, with moves like no others.
She could groove like a goddess that glues all the brothers.

I got shook. In a trance by her dance.
With one look, she commands with her glance.
Had to post up and wait for my chance.
Cut shorties like that get that proper romance.

Then when we dropped in, some depth was discovered.
That day she had changed, awakened, uncovered.
Like a cosmic fate, twin flames, came together.
As I spoke of truth, On God, it was clever.

As fate would have it the awakening was happening.
We were laughing, on the floor, talking madness
Micro dose acid, post sound bath and be blastin into action

{CHORUS}
She had them hips right. Tight jeans and the crop top.
Abs like a snake, body knock ya socks off
….Shits about to pop off

She had them hips right. Fast forward many nights.
I didnt get her number and went back to my own life.
You see I had a good girl but the sex was aight.
But something bout this one, stuck in my mind/night.

What was I do to, to choose between two,
Current girl was open, but this other was true.
In the fact that she knew her path.
And didn't want to share me with another in tact.

Then one new year's I dropped in with her mom.
Told her about my crush, and that her daughter was the bomb.
Surprised, she said, don't be a playa young man,
Then she told her daughter that I wanted her hand.

Meanwhile my girl was down to share on this plan.
A classic tale of trust, yet destined to go bust
Cuz she couldn't share me, devoted to the path
Of a closed union, I had to face the facts.

{CHORUS}

She had them hips right. And her mind right too.
Drove me wild just by speaking her truth.
How could a woman this young be so deep
Wrapped around my heart, in my dreams when I sleep.

These values beliefs, lines drawn in the sand.
With only one path to becoming her man.
I had to commit, all in, leave my current boo.
Said goodby, but I knew it was right to do.

With the open space to keep her safe,
we depend faith, created greatness.
Dreamed awake, and to this day we thrive,
amazed, the love remains, despite some pains along the way.

But now I praise a love so brave, and to my grave I love you babe.
We ride this wave, immune to hate, we elevate and co-create, the codes of fate, and radiate a love so great, a love so great.
Lord knows Our love is the force as we radiate.

The beauty and the purity was
Embodied in her essence, my soul felt compulsion.

Amazonian hair the curs on the lock lock
me in a stare.

She said she had an awakening that night
I guess I did too, as we talked about the majesty of truth.

Fast forward, we go toward a love so deep but couldn't say it.
Had to create a code word for I love you, code word blueberries.
Staring at her eyes in the hot tup, blue berries

I had two babes at the time, but she wasn't down to share,
Demanding path of union, 1 on 1 only fair.
So I took the eal.`,
    },
    {
      title: "EYE TO EYE",
      date: "6/24/2025",
      content: `Once upon a time there was a God so happening that they bless all the people with the power of compassion.
Awakened every soul, uplifted the masses, with the hopeono, the ancient rapture.

There was peace on the land, unity everlasting, seen as humans, with their flaws and their fashions. People, they stand, with their faith in their grasp and its seen on their face that the feel each others sadness.

You see. Your just like me, or at least you can be, not defined by your skin or your ethnicity.
Cus is time that we blend, to a humanity, where we put down the guns, to see the truth in the screams, and the need for safety because we're all just doing our best, all just trying to rest, all just finding our paths, as mortals of flesh, oppressed by the powers we can't help but resist.

So let rise so high (rise so high)
We seeing eye to eye (eye to eye)
We bringing up the vibe (up the vibe)
Together, so alive (so alive)

These days you cant go online with out a protest, a mob and some picket signs. Without a new mess, new law, new Columbine, and yet so many ar e scared feeling out of time.

But what ever happened to the golden rule, its like old allies now act a fool. It's like we all forget that each other was cool, I guess times do change, and people do too.

I just wish upon an earth that everybody could see, that it's not so hard to drop the ego and agree. at the end of the day nobody's really wrong, and if this could only be seen more people would belong.

If we could stop projecting and realize that there are gifts in the words of the ones we despise, cus as soon as we know we can't know what unfolds, humility can turn with nobility of soul.

So let rise so high (rise so high)
We seeing eye to eye (eye to eye)
We bringing up the vibe (up the vibe)
Because we're so alive (so alive)

Yo I know this sounds corny, but it takes one drop, to start up a ripple that moves a whole lot.
To rise like a phoenix and burn in the pain, of acceptance of it all, letting go of the shame.

Some times we gotta choose not the path that we want, but the path thats higher for the good of the bunch. The path that hurts, yet its the right thing, because pain can be alchemized beyond suffering.

And then maybe one day that vibe you create, it turns from a drop into a tidal wave, as others join in,
to lead and be brave, as we unify together, yo, what do you say?

There's no reason to wait, so absolve all your pain, forgive all the ones that have driven you insane, let go of the grudges and be free in the plane, of a thriving humanity, which together we create.

So let rise so high (rise so high)
We seeing eye to eye (eye to eye)
We bringing up the vibe (up the vibe)
Because we're so alive (so alive)

So let rise so high (rise so high)
We seeing eye to eye (eye to eye)
We bringing up the vibe (up the vibe)
Because we're so alive (so alive)`,
    },
    {
      title: "Baby, Change with Me",
      date: "6/8/2017",
      content: `You drive me to the point of suicide.
That old me no longer wants you inside.
Because the things you said you can't undo.
Therefore that old me is no part of you.

I wish it was easy or me to say
that leaving you was really easy
cuz baby there's no one that I love more.
Than the old you I wish you would be no more.

So baby change with me.
Lets be someone who we aught to be
Lets rise each other up in ecstasy.
Oh baby, please just change with me.

I know that change, it seems impossible.
But to say I was who I was back then
Would be impossible because I know
that I have changed from so much of my growth.

So baby change with me.
Lets be somebody who we once believed
lets go do all the things that make us see
That its worth a shot to change with me.

Baby change with me
We can do go upon our destiny
With you by my side, just take the leap
Oh baby, please just change with me.

Lets change our evil ways.
Lets change the fact that we make big mistakes.
Lets keep our promise and integrity.
By promising the new you and the new me.

Lets communicate.
Something we're pretty good at wouldn't you say.
Just be real with me.
And baby this can be our destiny.

But Im scared to do it with you.
Im scared to admit that there may be not much thats new.
That really deep inside of you.
You are to programmed by the past.

Out there in the world,
there may be someone better than you girl.
For me, but see I can not really see
another person so imperfectly perfect you see.

So what if instead,
you didn't change the thinking in your head
And I remain just who I am instead.
You be you, and I'll be Ted.

And I can know not to judge you for the things you do and say.
I can know to learn to love all of the things that drive me crazy. Oh, so crazay.
Because I dont claim to be perfect. And I don't expect you to be. Maybe without changing each other, we can simply change we. And change the way we acknowledge, and listen and accept you for you and me for me. Cause overtime I see you cry, it's when I know I'm so fallen in love you see. With all of your vulnerabilities. And maybe you shouldn't promise me a thing. And you can stay free.
Just know I will not give up on we.
Unless you fuck with me. And then I'll change the guy I once was, see.`,
    },
  ];

  // ---- Worldbuilding — a drawer of unfinished universes ----
  const WORLDS = [
    { img: "ipFated", title: "The Fated", kind: "Cosmology", note: "A civilization that can see every outcome but one — its own choosing." },
    { img: "ipInevitable", title: "Inevitable", kind: "Architecture of Time", note: "What if the future already happened, and memory is just the echo running backward?" },
    { img: "ipProsopagnosia", title: "Prosopagnosia", kind: "A World Without Faces", note: "A society that recognizes souls by their weather, not their features." },
    { img: "ipJuiced", title: "Juiced", kind: "Field Sketch", note: "Appetite as a religion. A neon parable about the hunger that eats its own god." },
    { img: "filmStill", title: "The Bestiary of Virtues", kind: "Symbolic System", note: "Eight archetypal creatures, each the living embodiment of a virtue to attune to." },
  ];

  // ---- Films ----
  const PAST_FILMS = [
    { img: "posterPlaces", title: "Oh, the Places You\u2019ll Go", year: "2014", cat: "Documentary",
      note: "A psychedelic odyssey through the dust and devotion of the playa." },
    { img: "posterSynthesis", title: "The Great Synthesis", year: "2023", cat: "Experimental",
      note: "There is no light without shadow — a meditation on duality and return." },
  ];
  const FUTURE_FILMS = [
    { img: "ipInevitable", title: "Inevitable", year: "In Development", cat: "Sci-Fi Feature",
      note: "Time is not a line. It is a room we keep walking back into." },
    { img: "ipFated", title: "The Fated", year: "In Development", cat: "Mythic Drama",
      note: "To know your destiny is the only way to lose it." },
    { img: "ipProsopagnosia", title: "Prosopagnosia", year: "In Development", cat: "Psychological",
      note: "A man who cannot see faces falls in love with the shape of a presence." },
  ];

  window.LIT_DATA = { VIRTUES, POEMS, ESSAYS, THOUGHTS, LYRICS, WORLDS, PAST_FILMS, FUTURE_FILMS };
})();
