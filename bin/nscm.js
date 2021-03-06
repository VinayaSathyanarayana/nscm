#!/usr/bin/env node

'use strict'

const args = require('args')
const config = require('../lib/config')
const tools = require('../lib/tools')

// Commands
const report = require('../commands/report')
const verify = require('../commands/verify')
const signin = require('../commands/signin')
const signout = require('../commands/signout')

const commands = [
  'report',
  'verify',
  'whitelist',
  'config',
  'signin',
  'login',
  'signout',
  'logout',
  'r',
  'w',
  'c',
  's',
  'o'
]

args
  .option('registry', 'Certified modules registry', '')
  .option('token', 'Token for registry authentication', '')
  .option('production', 'Only check production', false)
  .option('concurrency', 'Concurrency of requests', config.defaults.concurrency, parseInt)
  .option('json', 'Formats the report in JSON', false)
  .option('certified', 'Shows only certified packages')
  .option('failed', 'Shows only packages that failed certification', false)
  .option('output', 'Save report to file', false)
  .option('dot', 'Formats the report in Graphiz dot', false)
  .option('svg', 'Formats the report in SVG', false)
  .option('github', 'Sign in using GitHub SSO', false)
  .option('google', 'Sign in using Google SSO', false)
  .command('report', 'Get a report of your packages', report, ['r'])
  .command('verify', 'Verify if all packages are certified', verify)
  .command('whitelist', 'Whitelist your packages', ['w'])
  .command('config', 'Configure nscm options', ['c'])
  .command('signin', 'Sign in to nscm', signin, ['s', 'login'])
  .command('signout', 'Sign out of nscm', signout, ['o', 'logout'])

const flags = args.parse(process.argv, {
  usageFilter: tools.usageFilter
})

// Call report by default
if (!args.sub.length) {
  report(['report', 'r'], [], flags)
} else if (commands.indexOf(args.sub[0]) === -1) {
  args.showHelp()
}
