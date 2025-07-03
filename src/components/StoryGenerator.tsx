
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, BookOpen, Star, Moon, Sun, Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

interface StoryData {
  age: string;
  gender: string;
  interests: string[];
  style: string;
  lesson: string;
}

const StoryGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [storyData, setStoryData] = useState<StoryData>({
    age: '',
    gender: '',
    interests: [],
    style: '',
    lesson: ''
  });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const steps = [
    { title: "What's your age?", key: 'age' },
    { title: "Are you a boy or girl?", key: 'gender' },
    { title: "What do you love?", key: 'interests' },
    { title: "What kind of story?", key: 'style' },
    { title: "What should we learn?", key: 'lesson' },
    { title: "Your magical story!", key: 'story' }
  ];

  const ageOptions = [
    { value: '3-5', label: '3-5 years old', icon: '🎈', description: 'Simple words and fun pictures' },
    { value: '6-8', label: '6-8 years old', icon: '🌟', description: 'Adventure and friendship stories' },
    { value: '9-12', label: '9-12 years old', icon: '🚀', description: 'Exciting challenges and mysteries' }
  ];

  const genderOptions = [
    { value: 'boy', label: 'Boy', icon: '👦', gradient: 'from-blue-400 via-blue-500 to-purple-500' },
    { value: 'girl', label: 'Girl', icon: '👧', gradient: 'from-pink-400 via-pink-500 to-purple-500' }
  ];

  const interestOptions = [
    { value: 'animals', label: 'Animals', icon: '🦁', color: 'from-green-400 to-emerald-500', description: 'Wild adventures with furry friends' },
    { value: 'adventure', label: 'Adventure', icon: '🗺️', color: 'from-orange-400 to-red-500', description: 'Exciting journeys and quests' },
    { value: 'magic', label: 'Magic', icon: '✨', color: 'from-purple-400 to-pink-500', description: 'Spells, wizards, and enchantment' },
    { value: 'science', label: 'Science', icon: '🔬', color: 'from-blue-400 to-indigo-500', description: 'Amazing discoveries and experiments' },
    { value: 'sports', label: 'Sports', icon: '⚽', color: 'from-green-400 to-blue-500', description: 'Teamwork and athletic adventures' },
    { value: 'art', label: 'Art', icon: '🎨', color: 'from-pink-400 to-orange-500', description: 'Creative expression and imagination' },
    { value: 'music', label: 'Music', icon: '🎵', color: 'from-purple-400 to-blue-500', description: 'Melodies and musical journeys' },
    { value: 'nature', label: 'Nature', icon: '🌳', color: 'from-green-400 to-teal-500', description: 'Forest adventures and eco-discovery' },
    { value: 'space', label: 'Space', icon: '🌌', color: 'from-indigo-400 to-purple-500', description: 'Cosmic adventures among the stars' },
    { value: 'dinosaurs', label: 'Dinosaurs', icon: '🦕', color: 'from-yellow-400 to-orange-500', description: 'Prehistoric adventures and discovery' }
  ];

  const styleOptions = [
    { value: 'funny', label: 'Funny', icon: '😄', description: 'Full of giggles and silly moments', gradient: 'from-yellow-400 to-orange-500' },
    { value: 'heartwarming', label: 'Heartwarming', icon: '💖', description: 'Sweet and touching', gradient: 'from-pink-400 to-red-400' },
    { value: 'adventurous', label: 'Adventurous', icon: '🌟', description: 'Exciting and thrilling', gradient: 'from-blue-400 to-purple-500' },
    { value: 'magical', label: 'Magical', icon: '✨', description: 'Enchanted and mysterious', gradient: 'from-purple-400 to-pink-500' },
    { value: 'educational', label: 'Educational', icon: '📚', description: 'Fun way to learn new things', gradient: 'from-green-400 to-blue-500' }
  ];

  const lessonOptions = [
    { value: 'kindness', label: 'Kindness', icon: '💕', description: 'Being nice to others', gradient: 'from-pink-400 to-red-400' },
    { value: 'courage', label: 'Courage', icon: '🦁', description: 'Being brave when scared', gradient: 'from-orange-400 to-red-500' },
    { value: 'friendship', label: 'Friendship', icon: '🤝', description: 'Making and keeping friends', gradient: 'from-blue-400 to-purple-500' },
    { value: 'honesty', label: 'Honesty', icon: '✨', description: 'Always telling the truth', gradient: 'from-yellow-400 to-orange-500' },
    { value: 'perseverance', label: 'Never Give Up', icon: '💪', description: 'Keep trying even when it is hard', gradient: 'from-green-400 to-blue-500' },
    { value: 'sharing', label: 'Sharing', icon: '🎁', description: 'Sharing with others makes everyone happy', gradient: 'from-purple-400 to-pink-500' },
    { value: 'responsibility', label: 'Responsibility', icon: '⭐', description: 'Taking care of our duties', gradient: 'from-indigo-400 to-purple-500' },
    { value: 'empathy', label: 'Understanding Others', icon: '🤗', description: 'Understanding how others feel', gradient: 'from-teal-400 to-blue-500' }
  ];

  // Speech synthesis functions
  const startReading = () => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(generatedStory);
      utterance.rate = 0.8; // Slower rate for children
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.9;
      
      utterance.onstart = () => {
        setIsReading(true);
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
      };
      
      utterance.onerror = () => {
        setIsReading(false);
        setIsPaused(false);
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const pauseReading = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  };

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelection = (key: string, value: string | string[]) => {
    const updatedData = { ...storyData, [key]: value };
    setStoryData(updatedData);
    
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        if (currentStep === steps.length - 2) {
          generateStory(updatedData);
        }
      }, 300);
    }
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = storyData.interests.includes(interest)
      ? storyData.interests.filter(i => i !== interest)
      : [...storyData.interests, interest];
    
    if (updatedInterests.length > 0) {
      setTimeout(() => {
        handleSelection('interests', updatedInterests);
      }, 300);
    } else {
      setStoryData({ ...storyData, interests: updatedInterests });
    }
  };

  const generateStory = (data: StoryData) => {
    // Much longer, more detailed stories
    const stories = {
      'funny-animals-kindness': `Once upon a time, in the most wonderfully peculiar forest you could ever imagine, there lived a young ${data.gender} named ${data.gender === 'boy' ? 'Oliver' : 'Emma'}. This was not just any ordinary forest – oh no! This was the Gigglewood Forest, where the trees had polka-dotted bark that changed colors with the seasons, the flowers sang opera every morning at sunrise, and the rivers flowed with water that sparkled like liquid diamonds under the moonlight.

${data.gender === 'boy' ? 'Oliver' : 'Emma'} had moved to a cottage at the edge of Gigglewood Forest just last week with their grandmother, who was known throughout the land as the kindest baker who ever lived. Every morning, the sweet smell of fresh-baked cookies would drift from their little cottage, making all the forest creatures gather hopefully at their garden gate.

But there was something quite unusual happening in Gigglewood Forest. All the animals seemed to be having the most ridiculous arguments you could possibly imagine! The squirrels had formed two separate communities – the Pointy-Up Acorn Society and the Pointy-Down Acorn Alliance – and they spent all day debating which way acorns should be stored for winter. The debate had become so heated that they had built a wall of pine cones right down the middle of the Great Oak Tree!

The rabbits were not any better. They had split into the Bounce-Bounce-Stop Hoppers and the Bounce-Stop-Bounce Hoppers, and they could not agree on the proper hopping rhythm. They had actually drawn hopscotch-like squares all over the forest paths, marking their territories with different hopping patterns. It was nearly impossible to walk anywhere without accidentally stepping into someone's hopping zone and causing a tremendous fuss!

Even the wise old owls, who were supposed to be the smartest creatures in the forest, had gotten caught up in their own silly dispute. Half of them insisted that "Hoo" was the most dignified greeting, while the other half were absolutely convinced that "Hoot" was far more sophisticated. They had stopped speaking to each other entirely and would only communicate through elaborate wing gestures that nobody else could understand.

One particularly beautiful Tuesday morning, ${data.gender === 'boy' ? 'Oliver' : 'Emma'} decided to explore deeper into the forest than they had ever gone before. They packed a small basket with some of grandmother's famous chocolate chip cookies and set off down the winding Melody Path, where the trees hummed gentle lullabies as you walked beneath their branches.

As they wandered deeper into the forest, ${data.gender === 'boy' ? 'Oliver' : 'Emma'} heard the most terrible sobbing coming from Buttercup Meadow, a circular clearing where the most beautiful flowers in the forest grew in rainbow spirals. There, sitting in the very center of the meadow, was Benny the Bear – but he looked nothing like the majestic creature he usually was.

Poor Benny was covered from head to toe in what appeared to be pink and blue frosting, with bits of chocolate cake stuck in his fur and rainbow sprinkles scattered all around him like colorful confetti. It turned out that today was Benny's birthday, and he had been so excited about his special day that he had been dancing and twirling while carrying his enormous birthday cake. In his joy, he had spun around once too many times and had accidentally sat right down on his beautiful three-layer birthday cake!

All the other animals had gathered around the meadow, and instead of helping poor Benny, they were pointing and laughing. The Pointy-Up squirrels were chittering, "Look at him! He is even messier than a Pointy-Down acorn storage system!" The Bounce-Stop-Bounce rabbits were giggling, "He is covered in more colors than our hopping squares!" And the "Hoot" owls were calling out, "Hoot hoot! What a sight! Even our wing gestures are more graceful than that!"

But ${data.gender === 'boy' ? 'Oliver' : 'Emma'} saw something completely different. Instead of laughing, they walked slowly into the center of the meadow, sat down right next to Benny in all his frosting-covered glory, and said, "You know what, Benny? You look like the most delicious walking birthday cake I have ever seen! But more importantly, are you hurt? Are you okay?"

Benny looked up with tears in his eyes, surprise written all over his cake-covered face. "You... you are not going to laugh at me?" he asked in the gentlest bear voice.

"Why would I laugh?" ${data.gender === 'boy' ? 'Oliver' : 'Emma'} replied, taking out their handkerchief and gently wiping some frosting from Benny's nose. "Everyone has accidents. What matters is that you are not hurt, and that we help you feel better."

This simple act of kindness was like magic spreading through the meadow. One by one, the animals stopped laughing. A small rabbit from the Bounce-Bounce-Stop group hopped forward and said, "I... I have some napkins in my burrow. Would that help?" Soon, a Pointy-Down squirrel scampered down with some fresh water from the stream, and even one of the "Hoo" owls flew down with some soft moss to help clean up.

${data.gender === 'boy' ? 'Oliver' : 'Emma'} had a wonderful idea. "You know what?" they said, standing up and addressing all the animals. "Instead of arguing about acorns and hopping and greetings, why don't we all work together to give Benny the best birthday celebration Gigglewood Forest has ever seen?"

And so began the most marvelous collaboration the forest had witnessed in years. The Pointy-Up squirrels and Pointy-Down squirrels worked side by side, gathering the finest nuts from both the top and bottom of trees – and they discovered that mixing both storage methods actually kept the nuts fresher longer! The Bounce-Bounce-Stop rabbits and Bounce-Stop-Bounce rabbits created the most elaborate dance routine, combining both hopping styles into something magical and new. The "Hoo" owls and "Hoot" owls realized that they could create beautiful harmonies by combining their different calls.

As the sun began to set, painting the sky in shades of purple and gold, the most spectacular birthday party was ready. There was a new cake – even more beautiful than the first one – made with contributions from every animal in the forest. The squirrels had provided the finest nuts, the rabbits had gathered the sweetest berries, the owls had collected honey from the highest branches, and even the singing flowers had contributed their sweetest nectar.

But the most beautiful part was not the cake or the decorations or even the amazing dance performance. It was watching all the animals laughing together, sharing stories, and realizing that their differences did not have to divide them – they could make them stronger together.

As Benny made his birthday wish and blew out his candles (all 127 of them, because he was a very old and wise bear), he looked at ${data.gender === 'boy' ? 'Oliver' : 'Emma'} and said, "Thank you for showing us that kindness is the most powerful magic of all."

From that day forward, Gigglewood Forest became known not for its silly arguments, but for being the kindest place in the entire kingdom. The animals kept their different ways – some squirrels still preferred pointy-up acorns, some rabbits loved their bounce-stop-bounce rhythm, and the owls enjoyed their variety of greetings – but they celebrated these differences instead of fighting about them.

And ${data.gender === 'boy' ? 'Oliver' : 'Emma'}? They became known as the Kindness Keeper of Gigglewood Forest, and whenever any creature – big or small, furry or feathered, scaly or smooth – needed a friend, they knew exactly where to find one.

Every night, as ${data.gender === 'boy' ? 'Oliver' : 'Emma'} drifted off to sleep in their cozy cottage, they could hear the gentle sounds of the forest: the contented chattering of squirrels sharing acorn storage tips, the rhythmic hopping of rabbits dancing together, and the harmonious hooting of owls singing lullabies to the baby animals.

And they all lived happily, kindly, and quite wonderfully ever after, in the most magical forest where kindness bloomed like flowers and spread like sunshine, touching every heart it encountered.`,

      'adventurous-magic-courage': `In a realm far beyond the clouds, where shooting stars fell like gentle rain every evening and mountains floated majestically in the endless sky, there lived a brave young ${data.gender} named ${data.gender === 'boy' ? 'Alexander' : 'Aria'}. This magical world was called Luminastra, and it was filled with wonders that would make even the most creative imagination soar with delight.

In Luminastra, crystal caves sang the most beautiful lullabies that could heal any sadness, waterfalls flowed upward into the clouds where they became the most magnificent rainbow bridges, and gardens where flowers bloomed into butterflies at the stroke of midnight, painting the dark sky with wings of every color imaginable.

${data.gender === 'boy' ? 'Alexander' : 'Aria'} lived in the Sky Castle of Sunbeams with their wise aunt, the Guardian of Dawn, who had the important job of making sure the sun rose every morning with just the right amount of golden light. The castle was built on a cloud that sparkled like diamonds, and from their bedroom window, ${data.gender === 'boy' ? 'Alexander' : 'Aria'} could see all of Luminastra spread out below like a living map of dreams.

${data.gender === 'boy' ? 'Alexander' : 'Aria'} had always dreamed of going on grand adventures like the heroes in the ancient storybooks that lined the walls of their castle's library. They would spend hours reading about brave knights who rescued kingdoms, clever princesses who solved impossible puzzles, and wise wizards who brought peace to troubled lands. But there was one place that filled ${data.gender === 'boy' ? 'Alexander' : 'Aria'} with both excitement and terror: the mysterious Whispering Valley.

The Whispering Valley stretched between the Realm of Eternal Sunshine and the Kingdom of Gentle Moonlight, and it was said that no one had ever crossed it and returned to tell the tale. The valley was shrouded in swirling silver mists that moved like living creatures, and strange, beautiful sounds echoed from its depths – sometimes like singing, sometimes like gentle laughter, sometimes like the tinkling of a thousand tiny bells.

One crisp morning, as ${data.gender === 'boy' ? 'Alexander' : 'Aria'} was helping their aunt polish the Dawn Crystals that helped the sun shine brighter, a magnificent phoenix with feathers of gold and silver landed on their balcony. The phoenix carried an urgent message tied with ribbon that shimmered like starlight.

The message was from the Moon Princess Luna, ruler of the Kingdom of Gentle Moonlight, and it was the most desperate plea for help that ${data.gender === 'boy' ? 'Alexander' : 'Aria'} had ever read: "Dear brave soul who receives this message, our kingdom is in terrible danger. I have lost my voice – the magical voice that allows the moon to shine each night. Without it, our moon grows dimmer every evening, and soon eternal darkness will fall over both our lands. The only cure is the legendary Singing Pearl, hidden in the heart of the Whispering Valley. Please, if there is any courage in your heart, help us before it is too late."

${data.gender === 'boy' ? 'Alexander' : 'Aria'} felt their heart racing as they read the message. This was exactly the kind of adventure they had always dreamed about! But as they looked toward the Whispering Valley in the distance, their excitement quickly turned to fear. The valley looked even more mysterious and frightening than they had imagined, with its swirling mists and unknown dangers.

"I want to help," ${data.gender === 'boy' ? 'Alexander' : 'Aria'} whispered to themselves, "but what if I am not brave enough? What if I get lost forever in those mists? What if the legends are true and no one can cross the valley and live to tell about it?"

Their aunt, the Guardian of Dawn, found them standing on the balcony, staring at the valley with worry written all over their face. "My dear child," she said gently, placing a warm hand on their shoulder, "I can see the conflict in your heart. You want to help, but you are afraid."

"I am afraid," ${data.gender === 'boy' ? 'Alexander' : 'Aria'} admitted, feeling ashamed. "I have always wanted to be brave like the heroes in our storybooks, but now when real people need help, I am too scared to do anything about it."

The Guardian of Dawn smiled wisely. "True courage, my dear one, is not about not being afraid. True courage is feeling afraid and choosing to do what is right anyway. The bravest heroes in all our stories felt fear – but they also felt love for others that was stronger than their fear."

${data.gender === 'boy' ? 'Alexander' : 'Aria'} thought about the Moon Princess losing her voice, about all the children in the Moonlight Kingdom who would not be able to see the moon's gentle glow, about the baby animals who used moonbeams to find their way home at night. Slowly, a warm feeling began to grow in their chest – stronger than the fear, stronger than the worry.

"I have to try," ${data.gender === 'boy' ? 'Alexander' : 'Aria'} said with determination. "Even if I am scared, I have to try to help them."

The Guardian of Dawn hugged them tightly and gave them a small, glowing compass that would always point toward home, no matter how lost they might become. "Remember," she said, "courage grows stronger the more you use it, just like a muscle that gets stronger with exercise."

And so, with their heart pounding but their resolve firm, ${data.gender === 'boy' ? 'Alexander' : 'Aria'} set off toward the Whispering Valley. As they approached the edge of the swirling mists, they could hear their own heartbeat echoing in their ears. The entrance to the valley loomed before them like the mouth of a great, sleeping dragon.

Taking a deep breath and thinking of all the people counting on them, ${data.gender === 'boy' ? 'Alexander' : 'Aria'} stepped into the mist.

At first, everything seemed terrifying. The mist was so thick they could barely see their own hands, strange shadows seemed to move just at the edge of their vision, and the whispers that gave the valley its name seemed to be coming from everywhere and nowhere at once. ${data.gender === 'boy' ? 'Alexander' : 'Aria'}'s first instinct was to turn around and run back to safety.

But then something amazing happened. As ${data.gender === 'boy' ? 'Alexander' : 'Aria'} continued forward, despite their fear, they began to notice that the whispers were not frightening at all – they were gentle, encouraging voices saying things like "You can do this," and "We believe in you," and "Keep going, brave one."

The shadows they had thought were monsters turned out to be the Guardian Spirits of the valley – beautiful, translucent beings who had been waiting for centuries for someone with enough courage to enter their realm. They were not scary at all; they were dancing and celebrating ${data.gender === 'boy' ? 'Alexander' : 'Aria'}'s bravery!

"Welcome, Courageous Heart," said the eldest Guardian Spirit, a being that looked like it was made of starlight and gentle breezes. "We have been waiting so long for someone brave enough to help us share our greatest treasure."

The Guardian Spirits led ${data.gender === 'boy' ? 'Alexander' : 'Aria'} deeper into the valley, past crystal pools that reflected not your face, but your dreams, through groves of singing trees that hummed lullabies in harmony, and across bridges made of solid moonbeams that felt as sturdy as stone beneath their feet.

Finally, they came to the heart of the valley, where the most beautiful sight ${data.gender === 'boy' ? 'Alexander' : 'Aria'} had ever seen awaited them. There, floating in the center of a pool of liquid starlight, was the Singing Pearl. It was about the size of ${data.gender === 'boy' ? 'Alexander' : 'Aria'}'s fist, and it glowed with a soft, warm light that seemed to pulse like a gentle heartbeat. As it pulsed, it sang the most beautiful melody – a song that seemed to contain all the lullabies, all the love songs, and all the happy songs that had ever been sung.

But the eldest Guardian Spirit held up a gentle hand before ${data.gender === 'boy' ? 'Alexander' : 'Aria'} could reach for the pearl. "To claim the Singing Pearl," the spirit said with kindness in their voice, "you must first answer one question truthfully: What is the true meaning of courage?"

${data.gender === 'boy' ? 'Alexander' : 'Aria'} thought carefully about everything they had experienced – the fear they had felt, the love that had driven them forward, the way courage had grown stronger with each step they had taken. Finally, they answered with confidence:

"True courage is not about not being afraid. True courage is caring about others so much that you are willing to face your fears to help them. It is about doing what is right even when it is hard, and knowing that love is always stronger than fear."

The Singing Pearl suddenly glowed even brighter and began to float gently toward ${data.gender === 'boy' ? 'Alexander' : 'Aria'}, settling into their outstretched hands with a warmth that spread all the way to their heart. The Guardian Spirits all began to sing in harmony with the pearl, creating a song so beautiful that flowers began to bloom instantly all around the pool.

"You have shown true courage, brave ${data.gender === 'boy' ? 'Alexander' : 'Aria'}," said the eldest spirit. "The Singing Pearl is yours to take to the Moon Princess. But know this – the courage you have discovered within yourself is a treasure even greater than this pearl, and it will stay with you forever."

The journey back through the valley felt completely different now. The mists parted like curtains to show ${data.gender === 'boy' ? 'Alexander' : 'Aria'} the way home, the whispers sang encouraging songs, and the Guardian Spirits danced alongside them, celebrating their victory. When ${data.gender === 'boy' ? 'Alexander' : 'Aria'} finally emerged from the valley, they felt like a completely different person – still themselves, but braver, stronger, and more confident than ever before.

The Moon Princess was waiting at the edge of her kingdom, and when ${data.gender === 'boy' ? 'Alexander' : 'Aria'} presented her with the Singing Pearl, her voice returned more beautiful than ever. That very night, the moon shone with such brilliant, gentle light that it could be seen from every corner of both realms, and children everywhere fell asleep peacefully under its protective glow.

From that day forward, ${data.gender === 'boy' ? 'Alexander' : 'Aria'} was known throughout Luminastra as the Brave Heart, but they learned that the most important audience for their courage was themselves. They discovered that once you find courage within yourself, it never really goes away – it just grows stronger every time you choose to be brave.

And whenever any child in Luminastra felt afraid to try something new, to stand up for what was right, or to help someone in need, they would remember the story of ${data.gender === 'boy' ? 'Alexander' : 'Aria'} and the Whispering Valley, and they would find their own courage growing warm and strong in their hearts.

The moon still shines brightly every night in Luminastra, the Guardian Spirits still dance in the Whispering Valley, and ${data.gender === 'boy' ? 'Alexander' : 'Aria'} continues to have wonderful adventures, knowing that true courage – the kind that comes from love and kindness – can overcome any challenge and light up even the darkest night.`
    };

    // Generate story based on selections
    let story = stories['funny-animals-kindness'];
    
    if (data.style === 'magical' || data.interests.includes('magic') || data.style === 'adventurous') {
      story = stories['adventurous-magic-courage'];
    }
    
    // Customize story based on age
    if (data.age === '3-5') {
      story = story.replace(/magnificent/g, 'beautiful').replace(/extraordinary/g, 'amazing');
    }
    
    setGeneratedStory(story);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.key) {
      case 'age':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-fade-in bg-white/90 backdrop-blur-sm group"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleSelection('age', option.value)}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground">{option.label}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'gender':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {genderOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-10 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-primary/50 animate-fade-in bg-white/90 backdrop-blur-sm overflow-hidden group"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => handleSelection('gender', option.value)}
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${option.gradient} text-white group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-center space-y-4">
                    <div className="text-8xl mb-6 group-hover:bounce">{option.icon}</div>
                    <h3 className="text-3xl font-bold">{option.label}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'interests':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interestOptions.map((option, index) => (
              <Card
                key={option.value}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 animate-fade-in bg-white/90 backdrop-blur-sm group ${
                  storyData.interests.includes(option.value) 
                    ? 'border-primary shadow-xl scale-105 ring-2 ring-primary/20' 
                    : 'hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 75}ms` }}
                onClick={() => handleInterestToggle(option.value)}
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${option.color} text-white group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-center space-y-3">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                    <h3 className="text-xl font-bold">{option.label}</h3>
                    <p className="text-sm opacity-90">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
            {storyData.interests.length > 0 && (
              <div className="col-span-full text-center mt-6 p-4 bg-primary/10 rounded-2xl">
                <p className="text-primary font-semibold">Great choices! Creating your perfect story...</p>
              </div>
            )}
          </div>
        );

      case 'style':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styleOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-fade-in bg-white/90 backdrop-blur-sm group overflow-hidden"
                style={{ animationDelay: `${index * 120}ms` }}
                onClick={() => handleSelection('style', option.value)}
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${option.gradient} text-white group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-center space-y-4">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                    <h3 className="text-2xl font-bold">{option.label}</h3>
                    <p className="text-sm opacity-90">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'lesson':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonOptions.map((option, index) => (
              <Card
                key={option.value}
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/50 animate-fade-in bg-white/90 backdrop-blur-sm group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSelection('lesson', option.value)}
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${option.gradient} text-white group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-center space-y-4">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                    <h3 className="text-xl font-bold">{option.label}</h3>
                    <p className="text-sm opacity-90">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'story':
        return (
          <div className="animate-fade-in">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
              <div className="space-y-6">
                <div className="text-center">
                  <BookOpen className="mx-auto h-20 w-20 text-primary mb-6" />
                  <h2 className="text-4xl font-bold text-primary mb-4">Your Magical Bedtime Story</h2>
                  <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground bg-muted/50 rounded-full px-6 py-3">
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Age: {storyData.age}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Sparkles className="h-4 w-4" />
                      <span>Style: {storyData.style}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>Lesson: {storyData.lesson}</span>
                    </span>
                  </div>
                </div>

                {/* Reading Controls */}
                <div className="flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
                  <Volume2 className="h-6 w-6 text-purple-600" />
                  <span className="text-purple-800 font-semibold">Read Mode:</span>
                  {!isReading ? (
                    <button
                      onClick={startReading}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Reading</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {!isPaused ? (
                        <button
                          onClick={pauseReading}
                          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                        >
                          <Pause className="h-4 w-4" />
                          <span>Pause</span>
                        </button>
                      ) : (
                        <button
                          onClick={resumeReading}
                          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                        >
                          <Play className="h-4 w-4" />
                          <span>Resume</span>
                        </button>
                      )}
                      <button
                        onClick={stopReading}
                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors duration-200"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Stop</span>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="story-font text-lg leading-relaxed text-foreground space-y-6 max-h-[70vh] overflow-y-auto p-6 bg-gradient-to-b from-purple-50/50 to-pink-50/50 rounded-2xl border border-primary/10">
                  {generatedStory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      stopReading(); // Stop any ongoing reading
                      setCurrentStep(0);
                      setStoryData({
                        age: '', gender: '', interests: [], style: '', lesson: ''
                      });
                      setGeneratedStory('');
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="h-6 w-6" />
                    <span className="text-lg">Create Another Magical Story</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Moon className="h-10 w-10 text-purple-600 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Bedtime Story Creator
            </h1>
            <Star className="h-10 w-10 text-yellow-500 animate-pulse" />
          </div>
          
          {currentStep < steps.length - 1 && (
            <>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                {steps[currentStep].title}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full max-w-lg mx-auto bg-muted rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 h-4 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              <p className="text-muted-foreground text-lg">
                Step {currentStep + 1} of {steps.length - 1}
              </p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;
