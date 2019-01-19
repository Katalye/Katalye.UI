import { RepeatStrategyLocator } from "aurelia-templating-resources";
import { IteratorStrategy } from "./iterable-repeat-strategy";
import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

// From https://github.com/martingust/aurelia-repeat-strategies

export function configureRepeatStrategies(config: FrameworkConfiguration) {
    let repeatStrategyLocator = config.container.get(RepeatStrategyLocator) as RepeatStrategyLocator;
    repeatStrategyLocator.addStrategy(items => typeof items[Symbol.iterator] === "function", new IteratorStrategy());
}
