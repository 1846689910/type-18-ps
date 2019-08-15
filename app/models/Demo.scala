package models

import scala.collection.mutable
import scala.collection.mutable.{ArrayBuffer, ListBuffer}

object Demo {
  def main(args: Array[String]): Unit = {
    val list: Seq[Int] = List()
    val lb: ListBuffer[Int] = ListBuffer()
    val ab = ArrayBuffer()
    lb += 1
    lb += 2
    lb ++= List(3, 4, 5)
//    println(lb)
    lb.foreach(println)
    val it: Iterator[Int] = lb.iterator
    while (it.hasNext) println(it.next)
    val m = mutable.Map()
    val im: scala.collection.immutable.Map[Int, String] = scala.collection.immutable.Map(1 -> "a", 2 -> "b")
    im.foreach{case(k, v) => {println(s"${k}")}}
    val optA = im.get(1)

  }
}
