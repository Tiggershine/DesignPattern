// Observer Pattern
// Subject & Observers

/**
 * The Subject interface - a set of methods for managing subscribers.
 */
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

/**
 * The Subject owns some important state and notifies observers when the state changes.
 * observers: List for observers scribed
 */
class ConcreteSubject implements Subject {

  public state: number;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    // check, already in arrays?
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }
    // add the oberserver to subscriber-list
    this.observers.push(observer);
    console.log('Subject: Attached an observer');
    
  }

  public detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      // check, whether the observer alread in subscriber-list?
      if (observerIndex == -1) {
        return console.log('Subject: Nonexistent observer')
      }
      // delete the observer from subscriber-list
      this.observers.splice(observerIndex, 1);
      console.log('Subject: Detached an observer.')
  }

  public notify(): void {
    console.log('Subject: Notifying observers...');
    // notify to all of observer subscribed
    for(const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
* Usually, the subscription logic is only a fraction of what a Subject can
* really do. Subjects commonly hold some important business logic, that
* triggers a notification method whenever something important is about to
* happen (or after it).
 */
  public someBusinessLogic(): void {
    console.log('\nSubject: I\'m doing something important.');
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to ${this.state}`);
    this.notify;
  }
}



/**
 * The Observer interface declares the update method, used by subjects.
 */
interface Observer {
  update(subject: Subject): void;
}

/**
 * The client code
 */
class ConcreteObserverA implements Observer {
  update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && subject.state < 3) {
        console.log('ConcreteObserverA: React to the event. ');
      }
  }
}

class ConcreteObserverB implements Observer {
  update(subject: Subject): void {
      if (subject instanceof ConcreteSubject && (subject.state == 0 || subject.state >= 2)) {
        console.log('ConcreateObserver: React to the event. ' );
      }
  }
}

/**
 * The client code.
 */

 const subject = new ConcreteSubject();

 const observer1 = new ConcreteObserverA();
 subject.attach(observer1);
 
 const observer2 = new ConcreteObserverB();
 subject.attach(observer2);
 
 subject.someBusinessLogic();
 subject.someBusinessLogic();
 
 subject.detach(observer2);
 
 subject.someBusinessLogic();

