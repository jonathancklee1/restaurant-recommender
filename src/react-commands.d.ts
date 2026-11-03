import "react";

/** Native Invoker Commands attributes, not yet declared in @types/react. */
declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?: string;
    commandfor?: string;
  }
}
