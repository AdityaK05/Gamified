import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Trophy, Code, Zap, Variable, Repeat, Code2, Database, GitBranch, Layers, Clock, Coins, Star } from 'lucide-react'

const quests = [
  {
    id: 'variables',
    name: 'Variable Valley',
    description: 'Master the art of variables',
    icon: <Variable className="w-6 h-6" />,
    component: VariableQuest,
    color: 'from-yellow-700 to-yellow-1000',
    requiredLevel: 1,
  },
  {
    id: 'loops',
    name: 'Loop Lagoon',
    description: 'Navigate the waters of iteration',
    icon: <Repeat className="w-6 h-6" />,
    component: LoopQuest,
    color: 'from-blue-700 to-blue-1000',
    requiredLevel: 2,
  },
  {
    id: 'functions',
    name: 'Function Falls',
    description: 'Harness the power of functions',
    icon: <Code2 className="w-6 h-6" />,
    component: FunctionQuest,
    color: 'from-yellow-800 to-blue-800',
    requiredLevel: 3,
  },
  {
    id: 'dataStructures',
    name: 'Data Structure Dungeon',
    description: 'Explore the depths of data structures',
    icon: <Database className="w-6 h-6" />,
    component: DataStructureQuest,
    color: 'from-blue-800 to-yellow-800',
    requiredLevel: 4,
  },
  {
    id: 'algorithms',
    name: 'Algorithm Archipelago',
    description: 'Conquer the islands of algorithms',
    icon: <GitBranch className="w-6 h-6" />,
    component: AlgorithmQuest,
    color: 'from-yellow-900 to-blue-900',
    requiredLevel: 5,
  },
]

export default function CodeQuest() {
  const [currentQuest, setCurrentQuest] = useState(null)
  const [userStats, setUserStats] = useState({
    level: 1,
    exp: 0,
    coins: 0,
    character: '/placeholder.svg?height=64&width=64',
  })

  const updateUserStats = (expGain, coinGain) => {
    setUserStats(prev => {
      const newExp = prev.exp + expGain
      const newLevel = Math.floor(newExp / 100) + 1
      return {
        ...prev,
        level: newLevel,
        exp: newExp % 100,
        coins: prev.coins + coinGain,
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-300">
      <header className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold flex items-center text-yellow-700">
          <Gamepad2 className="mr-2" /> GAMIFIED
        </h1>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center bg-gray-800 text-yellow-600">
            <Star className="mr-1 h-4 w-4" /> Level {userStats.level}
          </Badge>
          <Progress value={userStats.exp} className="w-24 bg-gray-700" indicatorClassName="bg-yellow-700" />
          <Badge variant="secondary" className="flex items-center bg-gray-800 text-yellow-600">
            <Coins className="mr-1 h-4 w-4" /> {userStats.coins}
          </Badge>
          <Avatar>
            <AvatarImage src={userStats.character} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-yellow-600">Quest Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden bg-gray-900 border-2 ${userStats.level >= quest.requiredLevel ? 'border-yellow-700 cursor-pointer hover:shadow-xl hover:shadow-yellow-700/20 hover:scale-105 transition-all' : 'border-gray-800 opacity-50'}`}
                    onClick={() => userStats.level >= quest.requiredLevel && setCurrentQuest(quest)}>
                <div className={`h-2 bg-gradient-to-r ${quest.color}`} />
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-500">
                    {quest.icon}
                    <span className="ml-2">{quest.name}</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {userStats.level >= quest.requiredLevel ? (
                    <Badge variant="secondary" className="bg-gray-800 text-yellow-600">Available</Badge>
                  ) : (
                    <Badge variant="outline" className="border-gray-700 text-gray-500">Unlock at Level {quest.requiredLevel}</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {currentQuest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="mt-8 bg-gray-900 border-2 border-yellow-700">
                <CardHeader>
                  <CardTitle className="text-blue-500">{currentQuest.name}</CardTitle>
                  <CardDescription className="text-gray-400">{currentQuest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <currentQuest.component updateUserStats={updateUserStats} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-900 p-4 text-center shadow-lg">
        <Tabs defaultValue="inventory">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-gray-700 data-[state=active]:text-yellow-600">Inventory</TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-gray-700 data-[state=active]:text-yellow-600">Shop</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-gray-700 data-[state=active]:text-yellow-600">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="inventory" className="bg-gray-800 p-4 rounded-b-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Your Items</h3>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-700 w-12 h-12 rounded-md border border-gray-600"></div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shop" className="bg-gray-800 p-4 rounded-b-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Shop</h3>
            <p className="text-gray-400">Spend your coins on power-ups and cosmetics!</p>
          </TabsContent>
          <TabsContent value="achievements" className="bg-gray-800 p-4 rounded-b-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700">Achievements</h3>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start border-yellow-700 text-yellow-600">
                <Trophy className="mr-2" /> Code Ninja
              </Badge>
              <Badge variant="outline" className="w-full justify-start border-yellow-700 text-yellow-600">
                <Trophy className="mr-2" /> Bug Squasher
              </Badge>
              <Badge variant="outline" className="w-full justify-start border-yellow-700 text-yellow-600">
                <Trophy className="mr-2" /> Algorithm Ace
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </footer>
    </div>
  )
}

function VariableQuest({ updateUserStats }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  const checkAnswer = () => {
    if (answer.toLowerCase() === 'let' || answer.toLowerCase() === 'const') {
      setFeedback('Correct! You\'ve mastered variable declaration!')
      updateUserStats(20, 10)
    } else {
      setFeedback('Not quite. Try again, adventurer!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Declare a variable in modern JavaScript to store the name of your hero.</p>
      <div className="space-y-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your code"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={checkAnswer} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Submit Answer</Button>
      </div>
      {feedback && <p className="text-sm font-medium text-blue-500">{feedback}</p>}
    </div>
  )
}

function LoopQuest({ updateUserStats }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const loopFunction = new Function(`
        let treasures = [];
        ${code}
        return treasures;
      `)
      const result = loopFunction()
      setOutput(JSON.stringify(result))
      if (result.join(',') === '1,2,3,4,5') {
        setOutput('Congratulations! You\'ve collected all the treasures!')
        updateUserStats(30, 15)
      }
    } catch (error) {
      setOutput('Oh no! Your code encountered an error. Try again, brave coder!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Use a loop to collect 5 treasures and add them to the 'treasures' array.</p>
      <div className="space-y-2">
        <Label htmlFor="code" className="text-yellow-600">Your Magical Loop:</Label>
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="for (let i = 1; i <= 5; i++) { treasures.push(i); }"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <Button onClick={runCode} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Cast Your Spell</Button>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="font-semibold text-blue-500">Quest Log:</p>
        <pre className="font-mono text-yellow-600">{output}</pre>
      </div>
    </div>
  )
}

function FunctionQuest({ updateUserStats }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function(`
        ${code}
        return castFireball(3);
      `)
      const result = userFunction()
      setOutput(result.toString())
      if (result === 'Fireball deals 9 damage!') {
        setOutput('Impressive spell casting! Your fireball is powerful!')
        updateUserStats(40, 20)
      }
    } catch (error) {
      setOutput('Your spell fizzled! Check your incantation and try again.')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Create a function called "castFireball" that takes a power level and returns the damage dealt.</p>
      <div className="space-y-2">
        <Label htmlFor="function-code" className="text-yellow-600">Your Spell:</Label>
        <Input
          id="function-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function  castFireball(power) { return `Fireball deals ${power * 3} damage!`; }"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <Button onClick={runCode} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Cast Fireball</Button>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="font-semibold text-blue-500">Spell Effect:</p>
        <pre className="font-mono text-yellow-600">{output}</pre>
      </div>
    </div>
  )
}

function DataStructureQuest({ updateUserStats }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function(`
        ${code}
        return inventory.weapons[0];
      `)
      const result = userFunction()
      setOutput(result)
      if (result === 'Sword') {
        setOutput('Well done! Your inventory is properly organized.')
        updateUserStats(50, 25)
      }
    } catch (error) {
      setOutput('Your inventory is in chaos! Reorganize and try again.')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Create an object called "inventory" with an array of "weapons" including a "Sword".</p>
      <div className="space-y-2">
        <Label htmlFor="object-code" className="text-yellow-600">Your Inventory:</Label>
        <Input
          id="object-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="const inventory = { weapons: ['Sword', 'Bow', 'Axe'] };"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <Button onClick={runCode} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Check Inventory</Button>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="font-semibold text-blue-500">Inventory Check:</p>
        <pre className="font-mono text-yellow-600">{output}</pre>
      </div>
    </div>
  )
}

function AlgorithmQuest({ updateUserStats }) {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function(`
        ${code}
        return findTreasure([3, 7, 2, 9, 1]);
      `)
      const result = userFunction()
      setOutput(result.toString())
      if (result === 9) {
        setOutput('Eureka! You\'ve found the most valuable treasure!')
        updateUserStats(60, 30)
      }
    } catch (error) {
      setOutput('Your treasure map led you astray! Recalibrate and try again.')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-300">Write a function called "findTreasure" that finds the most valuable treasure (highest number) in an array.</p>
      <div className="space-y-2">
        <Label htmlFor="algorithm-code" className="text-yellow-600">Your Treasure Map:</Label>
        <Input
          id="algorithm-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function findTreasure(arr) { return Math.max(...arr); }"
          className="font-mono bg-gray-800 border-gray-700 text-yellow-600 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <Button onClick={runCode} className="bg-blue-700 hover:bg-blue-600 text-yellow-600 font-bold transition-all duration-200 ease-in-out transform hover:scale-105">Search for Treasure</Button>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <p className="font-semibold text-blue-500">Treasure Hunter's Log:</p>
        <pre className="font-mono text-yellow-600">{output}</pre>
      </div>
    </div>
  )
}
