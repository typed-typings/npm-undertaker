
declare class Undertaker {

    /**
     * The constructor is used to create a new instance of `Undertaker`. Each instance of
     * `Undertaker` gets its own instance of a registry. By default, the registry is an instance of
     * [`undertaker-registry`][undertaker-registry] but it can be an instance of any other registry
     * that follows the [Custom Registries API][custom-registries].
     *
     * To use a custom registry, pass a custom registry instance (`new CustomRegistry([options])`)
     * when instantiating a new `Undertaker` instance. This will use the custom registry instance
     * for that `Undertaker` instance.
     */
    constructor(registry?: Undertaker.Registry);

    task: Undertaker.TaskMethod;
    /**
     * Takes a variable amount of strings (taskName) and/or functions (fn)
     * and returns a function of the composed tasks or functions.
     * Any taskNames are retrieved from the registry using the get method.
     *
     * When the returned function is executed, the tasks or functions will be executed in series,
     * each waiting for the prior to finish. If an error occurs, execution will stop.
     * @param task
     */
    series(...tasks: (string | Undertaker.Task)[]): Undertaker.Task;

    /**
     * Takes a variable amount of strings (taskName) and/or functions (fn)
     * and returns a function of the composed tasks or functions.
     * Any taskNames are retrieved from the registry using the get method.
     *
     * When the returned function is executed, the tasks or functions will be executed in parallel,
     * all being executed at the same time. If an error occurs, all execution will complete.
     * @param tasks
     */
    parallel(...tasks: (string | Undertaker.Task)[]): Undertaker.Task;

    /**
     * Returns the current registry object.
     */
    registry(): Undertaker.Registry;

    /**
     * The tasks from the current registry will be transferred to it
     * and the current registry will be replaced with the new registry.
     * @param registry
     */
    registry(registry: Undertaker.Registry): void;

    /**
     * Optionally takes an object (options) and returns an object representing the tree of registered tasks.
     * @param options
     */
    tree(options?: { deep?: boolean }): Node[] | string[];

    /**
     * Takes a string or function (task) and returns a timestamp of the last time the task was run successfully.
     * The time will be the time the task started.  Returns undefined if the task has not been run.
     * @param task
     * @param timeResolution
     */
    lastRun(task: string, timeResolution?: number): number;
}

declare namespace Undertaker {

    export interface Task {
        (cb?: Function): any;
    }

    export interface TaskMethod {

        /**
         * Returns the registered function.
         * @param taskName
         */
        (taskName: string): Task;

        /**
         * Register the task by the taskName.
         * @param taskName
         * @param fn
         */
        (taskName: string, fn: Task): void;

        /**
         * Register the task by the name property of the function.
         * @param fn
         */
        (fn: Task): void;

        /**
         * Register the task by the displayName property of the function.
         * @param fn
         */
        (fn: Task & { displayName: string }): void;
    }

    export interface Registry {

        /**
         * receives the undertaker instance to set pre-defined tasks using the task(taskName, fn) method.
         * @param taker
         */
        init(taker: Undertaker): void;

        /**
         * returns the task with that name or undefined if no task is registered with that name.
         * @param taskName
         */
        get(taskName: string): Task;

        /**
         * add task to the registry. If set modifies a task, it should return the new task.
         * @param taskName
         * @param fn
         */
        set(taskName: string, fn: Task): void;

        /**
         * returns an object listing all tasks in the registry.
         */
        tasks(): { [taskName: string]: Task };
    }

    export interface Node {
        label: string;
        type: string;
        nodes: Node[];
    }
}

export = Undertaker;
